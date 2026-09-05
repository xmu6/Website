---
title: Wireshark 抓包
categories:
  - 测试工具
date: 2026-09-06 08:00:00
tags:
  - 抓包
  - Wireshark
permalink: /tools/8a6zj
coverImg: /covers/wireshark.webp
---

# 基础

- 抓包工具：用来抓取数据包的一个软件。
- 功能：网络故障排查。

## 常见协议

- ARP：地址解析协议，通过解析网络层地址来寻找数据链路层地址的网络传输协议。ARP是通过网络地址来定位MAC地址。

- ICMP：测试网络连通性。通，告诉延迟；不通，告诉原因，用ICMP包中的type+code的组合代表故障原因。

  | type | code | 描述         |
  | ---- | ---- | ------------ |
  | 0    | 0    | echo reply   |
  | 3    | 0    | 网络不可达   |
  | 3    | 1    | 主机不可达   |
  | 3    | 5    | 协议不可达   |
  | 3    | 3    | 端口不可达   |
  | 5    | 0    | 重定向       |
  | 8    | 0    | echo request |

- TCP：三次握手，四次挥手。

- HTTP：HTTP是TCP的上层协议，过滤TCP的数据包会包含HTTP协议的数据包。

# 过滤规则

## 按IP地址过滤

- 源IP为xx的包：`ip.src==192.168.0.17`
- 目标IP为xx的包：`ip.dst==223.5.5.5`
- 源或目标IP为xx的包：`ip.addr==192.168.0.17`

## 按MAC地址过滤

- 源MAC为xx的包：`eth.src==192.168.0.17`
- 目标MAC为xx的包：`eth.dst==223.5.5.5`
- 源或目标MAC为xx的包：`eth.addr==192.168.0.17`

## 按端口号过滤

- 源tcp端口为4694的包：`tcp.srcport==4694`
- 目标tcp端口为4694的包：`tcp.dstport==4694`
- 源或目标tcp端口为4694的包：`tcp.port==4694`

## 按协议类型过滤

- arp
- dhcp
- https

## 组合

- and
- or
- ！
