<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useEventListener } from 'vitepress-theme-teek'

const props = defineProps({
    hiddenTitle: {
        type: String,
        default: 'w(ﾟДﾟ)w 不要走！再看看嘛！'
    },
    returnTitle: {
        type: String,
        default: '♪(^∇^*)欢迎回来！'
    }
})

const originTitle = ref('')
const titleTimer = ref<ReturnType<typeof setTimeout>>()
const stopListener = ref<() => void>()

onMounted(() => {
    originTitle.value = document.title

    const handleVisibilityChange = () => {
        if (document.hidden) {
            document.title = props.hiddenTitle
            clearTimeout(titleTimer.value)
        } else {
            document.title = props.returnTitle
            titleTimer.value = setTimeout(() => {
                document.title = originTitle.value
            }, 2000)
        }
    }

    stopListener.value = useEventListener(document, 'visibilitychange', handleVisibilityChange)
})

onBeforeUnmount(() => {
    stopListener.value?.()
    clearTimeout(titleTimer.value)
})
</script>

<!-- 空模板：该组件仅处理标签页切换时的标题变化，无 UI 渲染，避免 Vue 缺失 render 函数警告 -->
<template>
  <span style="display: none"></span>
</template>