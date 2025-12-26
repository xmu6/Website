// 图片查看器功能实现
// 图片查看器类
class ImageViewer {
    private viewerWrapper: HTMLElement | null = null;
    private canvas: HTMLElement | null = null;
    private closeBtn: HTMLElement | null = null;
    private rotateBtn: HTMLElement | null = null;
    private prevBtn: HTMLElement | null = null;
    private nextBtn: HTMLElement | null = null;
    private fullScreenBtn: HTMLElement | null = null;
    private originalSizeBtn: HTMLElement | null = null;
    private zoomInBtn: HTMLElement | null = null;
    private zoomOutBtn: HTMLElement | null = null;
    private currentImg: HTMLImageElement | null = null;
    private imgList: string[] = [];
    private currentIndex: number = 0;
    private scale: number = 1;
    private rotation: number = 0;
    private isFullScreen: boolean = false;
    private isDragging: boolean = false;
    private dragStartX: number = 0;
    private dragStartY: number = 0;
    private translateX: number = 0;
    private translateY: number = 0;

    constructor() {
        this.init();
    }

    private init() {
        if (typeof window === "undefined") return;

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", this.setupImageListeners.bind(this));
        } else {
            this.setupImageListeners();
        }

        this.observeDOMChanges();
    }

    private setupImageListeners() {
        const vpDocElement = document.querySelector(".vp-doc");
        if (vpDocElement) {
            const images = vpDocElement.querySelectorAll("img:not(.tk-image-viewer__canvas img)");
            images.forEach(img => {
                const htmlImg = img as HTMLImageElement;
                if (!htmlImg.dataset.imageViewerInitialized) {
                    htmlImg.dataset.imageViewerInitialized = "true";
                    htmlImg.style.cursor = "pointer";
                    htmlImg.addEventListener("click", (e: MouseEvent) => this.handleImageClick(e, htmlImg));
                }
            });
        }
    }

    private observeDOMChanges() {
        const observer = new MutationObserver(() => {
            this.setupImageListeners();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    private handleImageClick(event: MouseEvent, img: HTMLImageElement) {
        event.stopPropagation();

        this.collectImages();
        this.currentIndex = this.imgList.findIndex(src => src === img.src);

        this.createViewer(img.src);
    }

    // 只收集内容区域中的图片
    private collectImages() {
        this.imgList = [];
        const vpDocElement = document.querySelector(".vp-doc");
        if (vpDocElement) {
            const images = vpDocElement.querySelectorAll("img:not(.tk-image-viewer__canvas img)");
            images.forEach(img => {
                this.imgList.push((img as HTMLImageElement).src);
            });
        }
    }

    private createViewer(src: string) {
        this.removeViewer();

        this.viewerWrapper = document.createElement("div");
        this.viewerWrapper.className = "tk-image-viewer__wrapper";

        this.canvas = document.createElement("div");
        this.canvas.className = "tk-image-viewer__canvas";

        const viewerImg = document.createElement("img");
        viewerImg.src = src;
        viewerImg.style.transform = "none";
        this.currentImg = viewerImg;

        this.closeBtn = document.createElement("button");
        this.closeBtn.className = "tk-image-viewer__close";
        this.closeBtn.innerHTML = '<i class="tk-icon">❌</i>';

        const actionsContainer = document.createElement("div");
        actionsContainer.className = "tk-image-viewer__actions";

        this.rotateBtn = document.createElement("button");
        this.rotateBtn.className = "tk-image-viewer__btn";
        this.rotateBtn.innerHTML = '<i class="tk-icon">🔄</i>';

        this.prevBtn = document.createElement("button");
        this.prevBtn.className = "tk-image-viewer__btn";
        this.prevBtn.innerHTML = '<i class="tk-icon">⬅️</i>';

        this.zoomOutBtn = document.createElement("button");
        this.zoomOutBtn.className = "tk-image-viewer__btn";
        this.zoomOutBtn.innerHTML = '<i class="tk-icon">➖</i>';

        this.fullScreenBtn = document.createElement("button");
        this.fullScreenBtn.className = "tk-image-viewer__btn";
        this.fullScreenBtn.innerHTML = '<i class="tk-icon">🔳</i>';

        this.originalSizeBtn = document.createElement("button");
        this.originalSizeBtn.className = "tk-image-viewer__btn";
        this.originalSizeBtn.innerHTML = '<i class="tk-icon">🔍</i>';

        this.zoomInBtn = document.createElement("button");
        this.zoomInBtn.className = "tk-image-viewer__btn";
        this.zoomInBtn.innerHTML = '<i class="tk-icon">➕</i>';

        this.nextBtn = document.createElement("button");
        this.nextBtn.className = "tk-image-viewer__btn";
        this.nextBtn.innerHTML = '<i class="tk-icon">➡️</i>';

        // 🚀底部功能操作按钮排序
        actionsContainer.appendChild(this.prevBtn);
        actionsContainer.appendChild(this.nextBtn);
        actionsContainer.appendChild(this.zoomInBtn);
        actionsContainer.appendChild(this.zoomOutBtn);
        actionsContainer.appendChild(this.fullScreenBtn);
        actionsContainer.appendChild(this.rotateBtn);
        actionsContainer.appendChild(this.originalSizeBtn);

        const infoContainer = document.createElement("div");
        infoContainer.className = "tk-image-viewer__info";
        infoContainer.textContent = `${this.currentIndex + 1} / ${this.imgList.length}`;
        (this.viewerWrapper as any).infoContainer = infoContainer;

        this.canvas.appendChild(viewerImg);
        this.viewerWrapper.appendChild(this.canvas);
        this.viewerWrapper.appendChild(this.closeBtn);
        this.viewerWrapper.appendChild(actionsContainer);
        this.viewerWrapper.appendChild(infoContainer);

        document.body.appendChild(this.viewerWrapper);

        this.addViewerEventListeners(viewerImg);
    }

    private addViewerEventListeners(img: HTMLImageElement) {
        if (!this.viewerWrapper || !this.canvas || !this.closeBtn) return;

        this.scale = 1;
        this.rotation = 0;
        this.isFullScreen = false;

        const scaleStep = 0.1;
        const maxScale = 3;
        const minScale = 0.5;
        const rotateStep = 90;

        const updateTransform = () => {
            img.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale}) rotate(${this.rotation}deg)`;
        };

        img.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
        });

        const handleDragStart = (e: MouseEvent) => {
            e.stopPropagation();
            this.isDragging = true;
            this.dragStartX = e.clientX - this.translateX;
            this.dragStartY = e.clientY - this.translateY;
            document.body.style.userSelect = "none";
        };

        const handleDragMove = (e: MouseEvent) => {
            if (!this.isDragging) return;
            this.translateX = e.clientX - this.dragStartX;
            this.translateY = e.clientY - this.dragStartY;
            updateTransform();
        };

        const handleDragEnd = () => {
            this.isDragging = false;
            document.body.style.userSelect = "";
        };

        img.addEventListener("mousedown", handleDragStart);
        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("mouseleave", handleDragEnd);

        const handleTouchStart = (e: TouchEvent) => {
            const touch = e.touches[0];
            e.stopPropagation();
            this.isDragging = true;
            this.dragStartX = touch.clientX - this.translateX;
            this.dragStartY = touch.clientY - this.translateY;
            document.body.style.userSelect = "none";
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!this.isDragging || e.touches.length !== 1) return;
            const touch = e.touches[0];
            this.translateX = touch.clientX - this.dragStartX;
            this.translateY = touch.clientY - this.dragStartY;
            updateTransform();
        };

        const handleTouchEnd = () => {
            this.isDragging = false;
            document.body.style.userSelect = "";
        };

        img.addEventListener("touchstart", handleTouchStart, { passive: false });
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleTouchEnd);
        document.addEventListener("touchcancel", handleTouchEnd);

        this.viewerWrapper.addEventListener("click", () => {
            this.removeViewer();
        });

        this.closeBtn.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            this.removeViewer();
        });

        if (this.rotateBtn) {
            const rotateBtnRef = this.rotateBtn;
            this.rotateBtn.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                this.rotation = (this.rotation + rotateStep) % 360;
                updateTransform();
                rotateBtnRef.classList.add("tk-image-viewer__btn--active");
                setTimeout(() => {
                    rotateBtnRef.classList.remove("tk-image-viewer__btn--active");
                }, 200);
            });
        }

        this.prevBtn!.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            if (this.imgList.length > 1) {
                this.currentIndex = (this.currentIndex - 1 + this.imgList.length) % this.imgList.length;
                this.switchImage(this.imgList[this.currentIndex]);
                this.prevBtn!.classList.add("tk-image-viewer__btn--active");
                setTimeout(() => {
                    this.prevBtn!.classList.remove("tk-image-viewer__btn--active");
                }, 200);
            }
        });

        this.nextBtn!.addEventListener("click", (e: MouseEvent) => {
            e.stopPropagation();
            if (this.imgList.length > 1) {
                this.currentIndex = (this.currentIndex + 1) % this.imgList.length;
                this.switchImage(this.imgList[this.currentIndex]);
                this.nextBtn!.classList.add("tk-image-viewer__btn--active");
                setTimeout(() => {
                    this.nextBtn!.classList.remove("tk-image-viewer__btn--active");
                }, 200);
            }
        });

        if (this.fullScreenBtn) {
            const fullScreenBtnRef = this.fullScreenBtn;
            this.fullScreenBtn.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                this.isFullScreen = !this.isFullScreen;
                if (this.isFullScreen) {
                    img.style.maxWidth = "none";
                    img.style.maxHeight = "none";
                    fullScreenBtnRef.innerHTML = '<i class="tk-icon">🔲</i>';
                } else {
                    img.style.maxWidth = "100%";
                    img.style.maxHeight = "100%";
                    fullScreenBtnRef.innerHTML = '<i class="tk-icon">🔳</i>';
                }
                fullScreenBtnRef.classList.add("tk-image-viewer__btn--active");
                setTimeout(() => {
                    fullScreenBtnRef.classList.remove("tk-image-viewer__btn--active");
                }, 200);
            });
        }

        if (this.originalSizeBtn) {
            const originalSizeBtnRef = this.originalSizeBtn;
            this.originalSizeBtn.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                this.scale = 1;
                this.rotation = 0;
                this.translateX = 0;
                this.translateY = 0;
                updateTransform();
                originalSizeBtnRef.classList.add("tk-image-viewer__btn--active");
                setTimeout(() => {
                    originalSizeBtnRef.classList.remove("tk-image-viewer__btn--active");
                }, 200);
            });
        }

        if (this.zoomInBtn) {
            const zoomInBtnRef = this.zoomInBtn;
            this.zoomInBtn.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                if (this.scale < maxScale) {
                    this.scale += scaleStep;
                    updateTransform();
                    zoomInBtnRef.classList.add("tk-image-viewer__btn--active");
                    setTimeout(() => {
                        zoomInBtnRef.classList.remove("tk-image-viewer__btn--active");
                    }, 200);
                }
            });
        }

        if (this.zoomOutBtn) {
            const zoomOutBtnRef = this.zoomOutBtn;
            this.zoomOutBtn.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                if (this.scale > minScale) {
                    this.scale -= scaleStep;
                    updateTransform();
                    zoomOutBtnRef.classList.add("tk-image-viewer__btn--active");
                    setTimeout(() => {
                        zoomOutBtnRef.classList.remove("tk-image-viewer__btn--active");
                    }, 200);
                }
            });
        }

        const handleKeydown = (e: KeyboardEvent) => {
            e.preventDefault();

            switch (e.key) {
                case "Escape":
                    this.removeViewer();
                    break;
                case "+":
                case "=":
                    if (this.scale < maxScale) {
                        this.scale += scaleStep;
                        updateTransform();
                    }
                    break;
                case "-":
                    if (this.scale > minScale) {
                        this.scale -= scaleStep;
                        updateTransform();
                    }
                    break;
                case "r":
                case "R":
                    this.rotation = (this.rotation + rotateStep) % 360;
                    updateTransform();
                    break;
                case "ArrowLeft":
                    if (this.imgList.length > 1) {
                        this.currentIndex = (this.currentIndex - 1 + this.imgList.length) % this.imgList.length;
                        this.switchImage(this.imgList[this.currentIndex]);
                    }
                    break;
                case "ArrowRight":
                    if (this.imgList.length > 1) {
                        this.currentIndex = (this.currentIndex + 1) % this.imgList.length;
                        this.switchImage(this.imgList[this.currentIndex]);
                    }
                    break;
                case "0":
                    this.scale = 1;
                    this.rotation = 0;
                    this.translateX = 0;
                    this.translateY = 0;
                    updateTransform();
                    break;
                case "f":
                case "F":
                    this.isFullScreen = !this.isFullScreen;
                    if (this.isFullScreen) {
                        img.style.maxWidth = "none";
                        img.style.maxHeight = "none";
                        if (this.fullScreenBtn) {
                            this.fullScreenBtn.innerHTML = '<i class="tk-icon">🔲</i>';
                        }
                    } else {
                        img.style.maxWidth = "100%";
                        img.style.maxHeight = "100%";
                        if (this.fullScreenBtn) {
                            this.fullScreenBtn.innerHTML = '<i class="tk-icon">🔳</i>';
                        }
                    }
                    break;
            }
        };

        document.addEventListener("keydown", handleKeydown);

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (e.deltaY < 0 && this.scale < maxScale) {
                this.scale += scaleStep;
                updateTransform();
            } else if (e.deltaY > 0 && this.scale > minScale) {
                this.scale -= scaleStep;
                updateTransform();
            }
        };

        this.viewerWrapper.addEventListener("wheel", handleWheel, { passive: false });

        (this.viewerWrapper as any).keydownHandler = handleKeydown;
        (this.viewerWrapper as any).wheelHandler = handleWheel;
        (this.viewerWrapper as any).dragStartHandler = handleDragStart;
        (this.viewerWrapper as any).dragMoveHandler = handleDragMove;
        (this.viewerWrapper as any).dragEndHandler = handleDragEnd;
        (this.viewerWrapper as any).touchStartHandler = handleTouchStart;
        (this.viewerWrapper as any).touchMoveHandler = handleTouchMove;
        (this.viewerWrapper as any).touchEndHandler = handleTouchEnd;
    }

    private switchImage(newSrc: string) {
        if (!this.currentImg || !this.viewerWrapper) return;

        this.currentImg.style.opacity = "0";

        setTimeout(() => {
            if (this.currentImg) {
                this.currentImg.src = newSrc;
                this.currentImg.style.opacity = "1";
                this.currentImg.style.transform = `scale(${this.scale}) rotate(${this.rotation}deg)`;
                if (this.isFullScreen) {
                    this.currentImg.style.maxWidth = "none";
                    this.currentImg.style.maxHeight = "none";
                } else {
                    this.currentImg.style.maxWidth = "100%";
                    this.currentImg.style.maxHeight = "100%";
                }
            }

            const infoContainer = (this.viewerWrapper as any).infoContainer;
            if (infoContainer) {
                infoContainer.textContent = `${this.currentIndex + 1} / ${this.imgList.length}`;
            }
        }, 200);
    }

    private removeViewer() {
        if (this.viewerWrapper) {
            const keydownHandler = (this.viewerWrapper as any).keydownHandler;
            const wheelHandler = (this.viewerWrapper as any).wheelHandler;
            const dragStartHandler = (this.viewerWrapper as any).dragStartHandler;
            const dragMoveHandler = (this.viewerWrapper as any).dragMoveHandler;
            const dragEndHandler = (this.viewerWrapper as any).dragEndHandler;
            const touchStartHandler = (this.viewerWrapper as any).touchStartHandler;
            const touchMoveHandler = (this.viewerWrapper as any).touchMoveHandler;
            const touchEndHandler = (this.viewerWrapper as any).touchEndHandler;

            if (keydownHandler) {
                document.removeEventListener("keydown", keydownHandler);
            }
            if (wheelHandler) {
                this.viewerWrapper.removeEventListener("wheel", wheelHandler);
            }
            if (dragStartHandler && this.currentImg) {
                this.currentImg.removeEventListener("mousedown", dragStartHandler);
            }
            if (dragMoveHandler) {
                document.removeEventListener("mousemove", dragMoveHandler);
            }
            if (dragEndHandler) {
                document.removeEventListener("mouseup", dragEndHandler);
                document.removeEventListener("mouseleave", dragEndHandler);
            }
            if (touchStartHandler && this.currentImg) {
                this.currentImg.removeEventListener("touchstart", touchStartHandler);
            }
            if (touchMoveHandler) {
                document.removeEventListener("touchmove", touchMoveHandler);
            }
            if (touchEndHandler) {
                document.removeEventListener("touchend", touchEndHandler);
                document.removeEventListener("touchcancel", touchEndHandler);
            }
            document.body.style.userSelect = "";

            this.viewerWrapper.classList.add("tk-image-viewer__wrapper--fade-out");

            setTimeout(() => {
                if (this.viewerWrapper && this.viewerWrapper.parentNode) {
                    this.viewerWrapper.parentNode.removeChild(this.viewerWrapper);
                }
                this.viewerWrapper = null;
                this.canvas = null;
                this.closeBtn = null;
                this.rotateBtn = null;
                this.prevBtn = null;
                this.nextBtn = null;
                this.fullScreenBtn = null;
                this.originalSizeBtn = null;
                this.zoomInBtn = null;
                this.zoomOutBtn = null;
                this.currentImg = null;
                this.imgList = [];
                this.currentIndex = 0;
                this.scale = 1;
                this.rotation = 0;
                this.isFullScreen = false;
                this.isDragging = false;
                this.translateX = 0;
                this.translateY = 0;
            }, 300);
        }
    }
}

// 所有样式已移至dd-image.scss

export function initImageViewer() {
    if (typeof window !== "undefined") {
        new ImageViewer();
    }
}