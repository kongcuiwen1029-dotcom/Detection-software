
      const moduleMeta = {
        overview: {
          title: "设备总览",
          subtitle: "集中查看 CPU、内存、日志缓存、驱动状态与待处理风险，并可从概览快速进入体检、清理、评测与实时监控链路。"
        },
        health: {
          title: "硬件体检",
          subtitle: "以一键体检、风险摘要、处理建议、立即修复、忽略本项与复检能力为核心，承载扫描类交互。"
        },
        hardware: {
          title: "硬件参数 / 检测",
          subtitle: "用于展示完整硬件识别结果，支持复制摘要、分类查看与导出完整报告。"
        },
        benchmark: {
          title: "硬件评测",
          subtitle: "承载整机跑分、分项跑分、AI 测试、压力测试与历史对比，突出结果回显与导出能力。"
        },
        monitor: {
          title: "硬件防护 / 监控",
          subtitle: "负责实时温度、风扇转速、频率 / 占用率与阈值规则配置，并联动悬浮监控与底部状态栏。"
        },
        cleanup: {
          title: "清理优化",
          subtitle: "支持垃圾清理、系统瘦身、C 盘瘦身、重复文件、专项清理与批量执行交互。"
        },
        driver: {
          title: "驱动检测 / 管理",
          subtitle: "识别缺失、异常与推荐更新的驱动，并完成筛选、排序、安装、重试与结果记录。"
        }
      };

      const detailMap = {
        "gpu-heat": {
          title: "GPU 高温告警",
          description: "图形核心在连续渲染场景下高于阈值，触发了监控规则中的高风险告警。",
          scope: "影响显卡核心区、性能稳定性与后续压力测试结果，长期持续会增加降频概率。",
          action: "建议先执行一键降温，再检查风扇曲线、后台高负载进程以及环境散热情况。",
          logs: "09:41 首次告警，09:43 GPU 占用 96%，09:44 温度 84°C，09:46 回落至 80°C。"
        }
      };

      const modalContent = {
        cooling: {
          title: "一键降温确认",
          description: "将临时降低高负载策略、提高风扇曲线并记录一次系统级调整日志。"
        },
        "deep-clean": {
          title: "深度清理确认",
          description: "深度清理会触达系统缓存、旧日志与部分可恢复文件，建议在低峰时段执行。"
        },
        export: {
          title: "导出报告确认",
          description: "将根据当前页面与筛选条件导出报告，支持 TXT、CSV、Excel 与 PDF 格式。"
        },
        pressure: {
          title: "压力测试确认",
          description: "压力测试将持续拉高 CPU 与 GPU 负载，并在过程中记录温度、频率与降频事件。"
        },
        threshold: {
          title: "阈值变更确认",
          description: "保存后新的阈值将立即生效，并影响悬浮面板、底部状态栏与告警规则判断。"
        },
        permission: {
          title: "权限策略说明",
          description: "管理员可执行驱动安装、系统级清理、启动项管理与底层监控配置，所有关键动作都将写入日志。"
        }
      };

      const cleanupData = [
        { id: 1, name: "系统临时文件", type: "垃圾清理", risk: "low", size: 3.6, description: "来自更新缓存与安装临时目录", action: "一键清理" },
        { id: 2, name: "日志缓存目录", type: "专项清理", risk: "medium", size: 4.8, description: "可按时间保留近 7 天日志", action: "清理并归档" },
        { id: 3, name: "浏览器缓存", type: "垃圾清理", risk: "low", size: 1.9, description: "释放浏览器缓存与缩略图文件", action: "清理" },
        { id: 4, name: "旧驱动安装包", type: "系统瘦身", risk: "medium", size: 2.4, description: "建议保留最近 1 个版本回退包", action: "清理" },
        { id: 5, name: "重复媒体素材", type: "专项清理", risk: "low", size: 6.2, description: "重复文件共 218 个，可逐项查看", action: "查看并处理" },
        { id: 6, name: "Windows 更新备份", type: "系统瘦身", risk: "high", size: 8.1, description: "删除后将影响旧版本回滚", action: "高风险清理" },
        { id: 7, name: "聊天应用专清", type: "专项清理", risk: "medium", size: 2.9, description: "包含图片、视频与临时附件缓存", action: "专项清理" },
        { id: 8, name: "缩略图数据库", type: "垃圾清理", risk: "low", size: 0.8, description: "可自动重建，对业务无影响", action: "清理" }
      ];

      const driverData = [
        { id: 1, name: "NVIDIA 显卡驱动", current: "551.12", target: "556.14", vendor: "NVIDIA", date: "2026-06-11", status: "推荐更新", priority: 3 },
        { id: 2, name: "Realtek 音频驱动", current: "6.0.9488", target: "6.0.9534", vendor: "Realtek", date: "2026-06-10", status: "推荐更新", priority: 2 },
        { id: 3, name: "Intel 无线网卡驱动", current: "23.0.8", target: "23.0.8", vendor: "Intel", date: "2026-05-28", status: "已安装", priority: 1 },
        { id: 4, name: "蓝牙适配器驱动", current: "11.0.4", target: "11.1.0", vendor: "Intel", date: "2026-06-03", status: "推荐更新", priority: 2 },
        { id: 5, name: "芯片组补丁包", current: "9.4.1", target: "9.5.0", vendor: "Intel", date: "2026-06-12", status: "异常", priority: 4 },
        { id: 6, name: "触控板驱动", current: "5.1.0", target: "5.1.2", vendor: "ELAN", date: "2026-06-01", status: "推荐更新", priority: 2 }
      ];

      const cleanupState = {
        page: 1,
        pageSize: 4,
        search: "",
        risk: "all",
        type: "all",
        sort: "size-desc",
        selected: new Set()
      };

      const driverState = {
        page: 1,
        pageSize: 4,
        search: "",
        status: "all",
        sort: "priority-desc"
      };

      const queueItems = [];
      let pendingModalKey = "";
      let healthScanTimer = null;
      let healthProgress = 0;
      let floatingVisible = true;
      let monitorSeed = 0;
      const floatingDigitMap = {
        0: ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
        1: ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
        2: ["01110", "10001", "00001", "00110", "01000", "10000", "11111"],
        3: ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
        4: ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
        5: ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
        6: ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
        7: ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
        8: ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
        9: ["01110", "10001", "10001", "01111", "00001", "00010", "11100"]
      };
      const floatingMotion = {
        currentX: 0,
        currentY: 0,
        targetX: 0,
        targetY: 0
      };
      const floatingDrag = {
        active: false,
        offsetX: 0,
        offsetY: 0,
        initialized: false
      };

      const navButtons = Array.from(document.querySelectorAll(".nav-item"));
      const sections = Array.from(document.querySelectorAll(".module-section"));
      const pageTitle = document.getElementById("pageTitle");
      const pageSubtitle = document.getElementById("pageSubtitle");
      const modalOverlay = document.getElementById("modalOverlay");
      const modalTitle = document.getElementById("modalTitle");
      const modalDescription = document.getElementById("modalDescription");
      const modalConsent = document.getElementById("modalConsent");
      const detailDrawerOverlay = document.getElementById("detailDrawerOverlay");
      const toastStack = document.getElementById("toastStack");
      const floatingWidget = document.getElementById("floatingWidget");
      const floatingOrb = document.getElementById("floatingOrb");
      const floatingDigitBoard = document.getElementById("floatingDigitBoard");
      const floatingTempReadout = document.getElementById("floatingTempReadout");

      function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
      }

      function isFloatingInline() {
        return window.matchMedia("(max-width: 820px)").matches;
      }

      function renderFloatingDigits(value) {
        const valueText = String(clamp(value, 0, 30)).padStart(2, "0");

        floatingDigitBoard.replaceChildren(
          ...valueText.split("").map((char) => {
            const digit = document.createElement("div");
            digit.className = "floating-digit";

            floatingDigitMap[char].forEach((row) => {
              row.split("").forEach((cell) => {
                const pixel = document.createElement("span");
                pixel.className = cell === "1" ? "floating-pixel on" : "floating-pixel";
                digit.appendChild(pixel);
              });
            });

            return digit;
          })
        );
      }

      function calculateRemainingDays(temp) {
        return clamp(Math.round(20 - (temp - 55) * 0.8 + Math.cos(monitorSeed / 2.8) * 2), 0, 30);
      }

      function updateFloatingDisplay(daysLeft, temp) {
        renderFloatingDigits(daysLeft);
        floatingDigitBoard.classList.toggle("danger", daysLeft < 7);
        floatingTempReadout.textContent = `${temp}°C`;
        floatingTempReadout.classList.toggle("danger", temp > 65);
        floatingWidget.setAttribute("aria-label", `悬浮监控球，剩余天数 ${daysLeft} 天，当前核心温度 ${temp} 摄氏度`);
      }

      function resetFloatingTilt() {
        floatingMotion.targetX = 0;
        floatingMotion.targetY = 0;
      }

      function updateFloatingTilt(clientX, clientY) {
        const rect = floatingOrb.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalizedX = clamp((clientX - centerX) / (rect.width * 0.62), -1, 1);
        const normalizedY = clamp((clientY - centerY) / (rect.height * 0.62), -1, 1);

        floatingMotion.targetY = normalizedX * 14;
        floatingMotion.targetX = -normalizedY * 14;
      }

      function renderFloatingOrb() {
        floatingMotion.currentX += (floatingMotion.targetX - floatingMotion.currentX) * 0.18;
        floatingMotion.currentY += (floatingMotion.targetY - floatingMotion.currentY) * 0.18;

        floatingWidget.style.setProperty("--rotate-x", `${floatingMotion.currentX.toFixed(2)}deg`);
        floatingWidget.style.setProperty("--rotate-y", `${floatingMotion.currentY.toFixed(2)}deg`);
        floatingWidget.style.setProperty("--shadow-x", `${(-floatingMotion.currentY * 1.05).toFixed(2)}px`);
        floatingWidget.style.setProperty("--shadow-scale", `${(1 - Math.abs(floatingMotion.currentY) * 0.01).toFixed(3)}`);
        floatingWidget.style.setProperty("--glow-x", `${clamp(50 - floatingMotion.currentY * 0.75, 40, 60).toFixed(2)}%`);
        floatingWidget.style.setProperty("--glow-y", `${clamp(22 + floatingMotion.currentX * 0.6, 15, 31).toFixed(2)}%`);
        floatingWidget.style.setProperty("--display-shift-x", `${(floatingMotion.currentY * 0.65).toFixed(2)}px`);
        floatingWidget.style.setProperty("--display-shift-y", `${(-floatingMotion.currentX * 0.5).toFixed(2)}px`);

        requestAnimationFrame(renderFloatingOrb);
      }

      function positionFloatingWidget(x, y) {
        const rect = floatingWidget.getBoundingClientRect();
        const maxX = Math.max(16, window.innerWidth - rect.width - 16);
        const maxY = Math.max(16, window.innerHeight - rect.height - 16);
        floatingWidget.style.left = `${clamp(x, 16, maxX)}px`;
        floatingWidget.style.top = `${clamp(y, 16, maxY)}px`;
      }

      function syncFloatingWidgetPosition(forceReset = false) {
        if (isFloatingInline()) {
          floatingWidget.style.removeProperty("left");
          floatingWidget.style.removeProperty("top");
          floatingDrag.initialized = false;
          return;
        }

        if (forceReset || !floatingDrag.initialized) {
          positionFloatingWidget(window.innerWidth - 148, window.innerHeight - 164);
          floatingDrag.initialized = true;
          return;
        }

        const currentLeft = Number.parseFloat(floatingWidget.style.left);
        const currentTop = Number.parseFloat(floatingWidget.style.top);
        if (Number.isFinite(currentLeft) && Number.isFinite(currentTop)) {
          positionFloatingWidget(currentLeft, currentTop);
        }
      }

      function showModule(module) {
        navButtons.forEach((button) => button.classList.toggle("active", button.dataset.moduleTarget === module));
        sections.forEach((section) => section.classList.toggle("active", section.dataset.module === module));
        pageTitle.textContent = moduleMeta[module].title;
        pageSubtitle.textContent = moduleMeta[module].subtitle;
      }

      navButtons.forEach((button) => {
        button.addEventListener("click", () => showModule(button.dataset.moduleTarget));
      });

      document.querySelectorAll("[data-jump]").forEach((button) => {
        button.addEventListener("click", () => showModule(button.dataset.jump));
      });

      function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        toastStack.appendChild(toast);
        window.setTimeout(() => {
          toast.remove();
        }, 2600);
      }

      function openModal(key) {
        const current = modalContent[key] || modalContent.cooling;
        pendingModalKey = key;
        modalTitle.textContent = current.title;
        modalDescription.textContent = current.description;
        modalConsent.checked = false;
        modalOverlay.classList.add("show");
      }

      function closeModal() {
        modalOverlay.classList.remove("show");
      }

      document.querySelectorAll("[data-modal]").forEach((button) => {
        button.addEventListener("click", () => openModal(button.dataset.modal));
      });

      document.getElementById("cancelModal").addEventListener("click", closeModal);
      modalOverlay.addEventListener("click", (event) => {
        if (event.target === modalOverlay) closeModal();
      });

      document.getElementById("confirmModal").addEventListener("click", () => {
        if (!modalConsent.checked) {
          showToast("请先确认已知晓风险后再继续执行。");
          return;
        }

        const actionTextMap = {
          cooling: "已执行一键降温策略。",
          "deep-clean": "深度清理任务已加入执行队列。",
          export: "已生成导出任务，并按当前筛选条件输出。",
          pressure: "压力测试已启动，结果将在评测页回写。",
          threshold: "阈值变更任务已确认。",
          permission: "已打开权限策略说明。"
        };

        pushQueue(pendingModalKey, actionTextMap[pendingModalKey] || "操作已确认执行。");
        showToast(actionTextMap[pendingModalKey] || "操作已确认执行。");
        closeModal();
      });

      function openDetail(key) {
        const detail = detailMap[key];
        if (!detail) return;

        document.getElementById("detailTitle").textContent = detail.title;
        document.getElementById("detailDescription").textContent = detail.description;
        document.getElementById("detailScope").textContent = detail.scope;
        document.getElementById("detailAction").textContent = detail.action;
        document.getElementById("detailLogs").textContent = detail.logs;
        detailDrawerOverlay.classList.add("show");
      }

      document.querySelectorAll("[data-detail]").forEach((button) => {
        button.addEventListener("click", () => openDetail(button.dataset.detail));
      });

      detailDrawerOverlay.addEventListener("click", (event) => {
        if (event.target === detailDrawerOverlay) detailDrawerOverlay.classList.remove("show");
      });
      document.getElementById("closeDrawer").addEventListener("click", () => detailDrawerOverlay.classList.remove("show"));

      function pushQueue(type, message) {
        const time = new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
        const tagMap = {
          cooling: ["正常", "已完成"],
          "deep-clean": ["警告", "排队中"],
          export: ["正常", "已完成"],
          pressure: ["警告", "执行中"],
          permission: ["正常", "已查看"]
        };

        const [kind, label] = tagMap[type] || ["正常", "已完成"];
        queueItems.unshift({ kind, label, message, time });
        renderQueue();
      }

      function renderQueue() {
        const queueList = document.getElementById("queueList");
        const defaults = [
          { kind: "warning", label: "排队中", title: "驱动兼容补丁", message: "等待管理员确认后执行", time: "10:08" },
          { kind: "normal", label: "已完成", title: "临时文件清理", message: "已释放 4.8 GB 空间", time: "09:54" },
          { kind: "danger", label: "告警", title: "GPU 高温事件", message: "已触发弹窗并记录 2 条日志", time: "09:41" }
        ];

        const merged = queueItems.map((item) => ({
          kind: item.kind === "警告" ? "warning" : item.kind === "危险" ? "danger" : "normal",
          label: item.label,
          title: "执行任务",
          message: item.message,
          time: item.time
        })).concat(defaults).slice(0, 5);

        queueList.innerHTML = merged.map((item) => `
          <div class="queue-item">
            <span class="status-badge ${item.kind}">${item.label}</span>
            <div><strong>${item.title}</strong><span>${item.message}</span></div>
            <span>${item.time}</span>
          </div>
        `).join("");
      }

      function renderSparkline(targetId, values, color) {
        const svg = document.getElementById(targetId);
        if (!svg) return;

        const width = 280;
        const height = 58;
        const step = width / (values.length - 1);
        const max = Math.max(...values);
        const min = Math.min(...values);
        const normalize = (value) => {
          const range = max - min || 1;
          return height - ((value - min) / range) * 42 - 8;
        };
        const path = values.map((value, index) => `${index === 0 ? "M" : "L"} ${index * step} ${normalize(value)}`).join(" ");

        svg.innerHTML = `
          <path d="${path}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"></path>
          ${values.map((value, index) => `<circle cx="${index * step}" cy="${normalize(value)}" r="2.5" fill="${color}"></circle>`).join("")}
        `;
      }

      function buildChart(svgId, cpuData, gpuData, memoryData) {
        const svg = document.getElementById(svgId);
        if (!svg) return;

        const width = 760;
        const height = 220;
        const top = 18;
        const left = 8;
        const usableHeight = 168;
        const bottom = 198;
        const step = (width - left * 2) / (cpuData.length - 1);
        const normalize = (value) => bottom - (value / 100) * usableHeight;

        function pathFor(values) {
          return values.map((value, index) => `${index === 0 ? "M" : "L"} ${left + index * step} ${normalize(value)}`).join(" ");
        }

        const labels = Array.from({ length: 6 }, (_, index) => 10 * index).map((item) => `${item}m`);

        svg.innerHTML = `
          <rect x="0" y="${normalize(84)}" width="${width}" height="${bottom - normalize(84)}" fill="rgba(194,65,12,0.08)"></rect>
          ${Array.from({ length: 5 }, (_, index) => {
            const y = top + index * 42;
            return `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="rgba(99,117,106,0.14)" stroke-dasharray="4 6"></line>`;
          }).join("")}
          <path d="${pathFor(cpuData)}" fill="none" stroke="${getComputedStyle(document.documentElement).getPropertyValue("--brand").trim()}" stroke-width="3.2" stroke-linecap="round"></path>
          <path d="${pathFor(gpuData)}" fill="none" stroke="${getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()}" stroke-width="3.2" stroke-linecap="round"></path>
          <path d="${pathFor(memoryData)}" fill="none" stroke="#5f8f4a" stroke-width="3.2" stroke-linecap="round"></path>
          ${labels.map((label, index) => `<text x="${left + index * ((width - left * 2) / (labels.length - 1))}" y="214" fill="#63756a" font-size="12">${label}</text>`).join("")}
        `;
      }

      function createWave(base, amplitude, points, offset) {
        return Array.from({ length: points }, (_, index) => {
          const value = base + Math.sin((index + offset) / 2.2) * amplitude + Math.cos((index + offset) / 4.8) * amplitude * 0.45;
          return Math.max(24, Math.min(94, Math.round(value)));
        });
      }

      function refreshCharts() {
        monitorSeed += 1;
        const cpu = createWave(58, 18, 12, monitorSeed);
        const gpu = createWave(67, 16, 12, monitorSeed + 1.7);
        const memory = createWave(61, 8, 12, monitorSeed + 3.2);

        renderSparkline("overviewCpuSpark", cpu, "#0f766e");
        renderSparkline("overviewMemorySpark", memory, "#5f8f4a");
        renderSparkline("overviewLogSpark", createWave(72, 5, 12, monitorSeed + 2.3), "#d97706");
        renderSparkline("overviewTempSpark", gpu, "#c2410c");
        buildChart("overviewMonitorChart", cpu, gpu, memory);
        buildChart("liveMonitorChart", cpu, gpu, memory);

        const latestCpu = cpu[cpu.length - 1];
        const latestGpu = gpu[gpu.length - 1];
        const latestMemory = memory[memory.length - 1];
        const latestTemp = Math.round(64 + (latestGpu - 60) * 0.55);
        const remainingDays = calculateRemainingDays(latestTemp);

        updateRealtimeNumbers(latestCpu, latestGpu, latestMemory, latestTemp, remainingDays);
      }

      function updateRealtimeNumbers(cpu, gpu, memory, temp, remainingDays) {
        document.getElementById("overviewCpuValue").textContent = `${cpu}%`;
        document.getElementById("cpuMetricLarge").textContent = `${cpu}%`;
        document.getElementById("bottomCpu").textContent = `${cpu}%`;

        const memoryGb = (32 - (memory / 100) * 32).toFixed(1);
        document.getElementById("overviewMemoryValue").textContent = `${memoryGb} GB`;
        document.getElementById("bottomMemory").textContent = `${memory}%`;

        document.getElementById("overviewTempValue").textContent = `${temp}°C`;
        document.getElementById("tempMetricLarge").textContent = `${temp}°C`;
        updateFloatingDisplay(remainingDays, temp);

        document.getElementById("bottomGpu").textContent = `${gpu}%`;
        document.getElementById("bottomDisk").textContent = `${Math.max(82, Math.min(96, Math.round(88 + Math.sin(monitorSeed / 3) * 4)))}%`;

        document.getElementById("sensorCpuTemp").textContent = `${temp}°C`;
        document.getElementById("sensorGpuTemp").textContent = `${Math.min(88, temp + 14)}°C`;
        document.getElementById("sensorFan").textContent = `${3200 + Math.round(Math.sin(monitorSeed / 2) * 180)} RPM`;
        document.getElementById("liveAverage").textContent = `${Math.round((cpu + gpu + memory) / 3)}%`;
      }

      function startHealthScan() {
        if (healthScanTimer) {
          showToast("体检任务正在执行中。");
          return;
        }

        const steps = [
          "准备扫描环境",
          "检测 CPU 与频率状态",
          "检测显卡与温度波动",
          "检测系统盘空间与健康状态",
          "校验驱动与兼容补丁",
          "汇总结果并生成建议"
        ];

        healthProgress = 0;
        updateHealthProgress(0, steps[0], "0 项异常 / 0 项建议");
        showToast("体检任务已启动。");

        healthScanTimer = window.setInterval(() => {
          healthProgress += 16 + Math.round(Math.random() * 6);
          const capped = Math.min(100, healthProgress);
          const stepIndex = Math.min(steps.length - 1, Math.floor((capped / 100) * steps.length));
          const issueText = capped < 40 ? "0 项异常 / 1 项建议" : capped < 75 ? "1 项异常 / 2 项建议" : "1 项异常 / 3 项建议";
          updateHealthProgress(capped, steps[stepIndex], issueText);

          if (capped >= 100) {
            window.clearInterval(healthScanTimer);
            healthScanTimer = null;
            document.getElementById("healthIssueCount").textContent = "1 项高风险 / 2 项中风险 / 3 项建议";
            document.getElementById("healthIgnoredCount").textContent = "1";
            showToast("体检完成，已生成处理建议。");
            pushQueue("cooling", "体检完成，发现 1 项高风险与 5 项建议。");
          }
        }, 520);
      }

      function updateHealthProgress(progress, step, summary) {
        document.getElementById("healthProgressBar").style.width = `${progress}%`;
        document.getElementById("healthProgressText").textContent = `${progress}%`;
        document.getElementById("healthCurrentStep").textContent = step;
        document.getElementById("healthIssueCount").textContent = summary;
      }

      function formatRiskText(risk) {
        if (risk === "high") return '<span class="risk-badge high">高风险</span>';
        if (risk === "medium") return '<span class="risk-badge medium">中风险</span>';
        return '<span class="risk-badge low">低风险</span>';
      }

      function renderCleanupTable() {
        const keyword = cleanupState.search.trim().toLowerCase();
        let filtered = cleanupData.filter((item) => {
          const matchesSearch = !keyword || [item.name, item.type, item.description].join(" ").toLowerCase().includes(keyword);
          const matchesRisk = cleanupState.risk === "all" || item.risk === cleanupState.risk;
          const matchesType = cleanupState.type === "all" || item.type === cleanupState.type;
          return matchesSearch && matchesRisk && matchesType;
        });

        filtered = filtered.sort((a, b) => {
          if (cleanupState.sort === "size-desc") return b.size - a.size;
          if (cleanupState.sort === "size-asc") return a.size - b.size;
          if (cleanupState.sort === "risk-desc") {
            const weight = { high: 3, medium: 2, low: 1 };
            return weight[b.risk] - weight[a.risk];
          }
          return a.name.localeCompare(b.name, "zh-CN");
        });

        const totalPages = Math.max(1, Math.ceil(filtered.length / cleanupState.pageSize));
        cleanupState.page = Math.min(cleanupState.page, totalPages);
        const startIndex = (cleanupState.page - 1) * cleanupState.pageSize;
        const pageItems = filtered.slice(startIndex, startIndex + cleanupState.pageSize);

        document.getElementById("cleanupRows").innerHTML = pageItems.map((item) => `
          <div class="table-body-row cleanup-row">
            <span><input class="check cleanup-check" data-id="${item.id}" type="checkbox" ${cleanupState.selected.has(item.id) ? "checked" : ""} /></span>
            <div class="row-title">
              <strong>${item.name}</strong>
              <span class="table-meta">${item.description}</span>
            </div>
            <span>${item.type}</span>
            <span>${formatRiskText(item.risk)}</span>
            <strong>${item.size.toFixed(1)} GB</strong>
            <span>${item.description}</span>
            <div class="row-actions">
              <button class="table-action">${item.action}</button>
              <button class="table-action" data-modal="${item.risk === "high" ? "deep-clean" : "export"}">详情</button>
            </div>
          </div>
        `).join("");

        document.getElementById("cleanupSummary").textContent = `共 ${filtered.length} 项，当前第 ${cleanupState.page} / ${totalPages} 页`;
        renderPagination("cleanupPagination", totalPages, cleanupState.page, (page) => {
          cleanupState.page = page;
          renderCleanupTable();
        });

        document.querySelectorAll(".cleanup-check").forEach((checkbox) => {
          checkbox.addEventListener("change", () => {
            const id = Number(checkbox.dataset.id);
            if (checkbox.checked) cleanupState.selected.add(id);
            else cleanupState.selected.delete(id);
            updateCleanupSelectionSummary();
          });
        });

        document.querySelectorAll("#cleanupRows [data-modal]").forEach((button) => {
          button.addEventListener("click", () => openModal(button.dataset.modal));
        });

        updateCleanupSelectionSummary();
      }

      function updateCleanupSelectionSummary() {
        const total = cleanupData
          .filter((item) => cleanupState.selected.has(item.id))
          .reduce((sum, item) => sum + item.size, 0);
        document.getElementById("cleanupSelectedSize").textContent = `${total.toFixed(1)} GB`;
      }

      function renderDriverTable() {
        const keyword = driverState.search.trim().toLowerCase();
        let filtered = driverData.filter((item) => {
          const matchesSearch = !keyword || [item.name, item.vendor, item.current, item.target].join(" ").toLowerCase().includes(keyword);
          const matchesStatus = driverState.status === "all" || item.status === driverState.status;
          return matchesSearch && matchesStatus;
        });

        filtered = filtered.sort((a, b) => {
          if (driverState.sort === "priority-desc") return b.priority - a.priority;
          if (driverState.sort === "date-desc") return b.date.localeCompare(a.date);
          return a.name.localeCompare(b.name, "zh-CN");
        });

        const totalPages = Math.max(1, Math.ceil(filtered.length / driverState.pageSize));
        driverState.page = Math.min(driverState.page, totalPages);
        const startIndex = (driverState.page - 1) * driverState.pageSize;
        const pageItems = filtered.slice(startIndex, startIndex + driverState.pageSize);

        document.getElementById("driverRows").innerHTML = pageItems.map((item) => {
          const statusClass = item.status === "异常" ? "danger" : item.status === "推荐更新" ? "warning" : "normal";
          const actionButtons = item.status === "已安装"
            ? '<button class="table-action">查看日志</button>'
            : '<button class="table-action primary driver-install">安装</button><button class="table-action">忽略更新</button>';

          return `
            <div class="table-body-row driver-row">
              <div class="row-title">
                <strong>${item.name}</strong>
                <span class="table-meta">优先级 ${item.priority}</span>
              </div>
              <span>${item.current}</span>
              <span>${item.target}</span>
              <span>${item.vendor}</span>
              <span>${item.date}</span>
              <span class="status-badge ${statusClass}">${item.status}</span>
              <div class="row-actions" data-driver-id="${item.id}">${actionButtons}</div>
            </div>
          `;
        }).join("");

        document.getElementById("driverSummary").textContent = `共 ${filtered.length} 项，当前第 ${driverState.page} / ${totalPages} 页`;
        renderPagination("driverPagination", totalPages, driverState.page, (page) => {
          driverState.page = page;
          renderDriverTable();
        });

        document.querySelectorAll(".driver-install").forEach((button) => {
          button.addEventListener("click", () => {
            openModal("permission");
            pushQueue("pressure", "驱动安装任务已加入队列，等待用户确认。");
          });
        });
      }

      function renderPagination(targetId, totalPages, activePage, onChange) {
        const target = document.getElementById(targetId);
        target.innerHTML = "";

        Array.from({ length: totalPages }, (_, index) => index + 1).forEach((page) => {
          const button = document.createElement("button");
          button.className = `page-button${page === activePage ? " active" : ""}`;
          button.textContent = page;
          button.addEventListener("click", () => onChange(page));
          target.appendChild(button);
        });
      }

      document.getElementById("cleanupSearch").addEventListener("input", (event) => {
        cleanupState.search = event.target.value;
        cleanupState.page = 1;
        renderCleanupTable();
      });
      document.getElementById("cleanupRiskFilter").addEventListener("change", (event) => {
        cleanupState.risk = event.target.value;
        cleanupState.page = 1;
        renderCleanupTable();
      });
      document.getElementById("cleanupTypeFilter").addEventListener("change", (event) => {
        cleanupState.type = event.target.value;
        cleanupState.page = 1;
        renderCleanupTable();
      });
      document.getElementById("cleanupSort").addEventListener("change", (event) => {
        cleanupState.sort = event.target.value;
        renderCleanupTable();
      });
      document.getElementById("cleanupCheckAll").addEventListener("change", (event) => {
        const checked = event.target.checked;
        cleanupData.forEach((item) => {
          if (checked) cleanupState.selected.add(item.id);
          else cleanupState.selected.delete(item.id);
        });
        renderCleanupTable();
      });

      document.getElementById("driverSearch").addEventListener("input", (event) => {
        driverState.search = event.target.value;
        driverState.page = 1;
        renderDriverTable();
      });
      document.getElementById("driverStatusFilter").addEventListener("change", (event) => {
        driverState.status = event.target.value;
        driverState.page = 1;
        renderDriverTable();
      });
      document.getElementById("driverSort").addEventListener("change", (event) => {
        driverState.sort = event.target.value;
        renderDriverTable();
      });

      document.getElementById("thresholdForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const cpu = Number(form.get("cpuThreshold"));
        const gpu = Number(form.get("gpuThreshold"));
        const memory = Number(form.get("memoryThreshold"));

        if (Number.isNaN(cpu) || Number.isNaN(gpu) || Number.isNaN(memory)) {
          document.getElementById("thresholdHint").textContent = "所有阈值都必须为数值。";
          return;
        }

        if (cpu < 50 || cpu > 100 || gpu < 50 || gpu > 100 || memory < 30 || memory > 99) {
          document.getElementById("thresholdHint").textContent = "阈值超出允许范围，请按字段限制重新填写。";
          return;
        }

        document.getElementById("thresholdHint").textContent = "保存成功，新的阈值已即时生效。";
        showToast("阈值配置已保存，并已写入监控规则。");
        pushQueue("threshold", `阈值更新：CPU ${cpu}°C / GPU ${gpu}°C / 内存 ${memory}%`);
      });

      document.getElementById("globalScan").addEventListener("click", () => {
        showModule("health");
        startHealthScan();
      });
      document.getElementById("startHealthScan").addEventListener("click", startHealthScan);
      document.getElementById("recheckHealth").addEventListener("click", () => {
        updateHealthProgress(0, "准备重新扫描", "0 项异常 / 0 项建议");
        startHealthScan();
      });
      document.getElementById("repairSelected").addEventListener("click", () => openModal("cooling"));
      document.getElementById("ignoreSelected").addEventListener("click", () => {
        document.getElementById("healthIgnoredCount").textContent = "2";
        showToast("已将选中问题标记为暂不处理。");
      });

      document.getElementById("copyHardware").addEventListener("click", async () => {
        const text = [
          "设备：PulseDesk 研发终端 A17",
          "CPU：Intel Core i9-14900HX",
          "显卡：NVIDIA RTX 4080 Laptop",
          "内存：32 GB / 5600 MT/s",
          "系统盘：Samsung 990 Pro 2TB / 剩余 186 GB"
        ].join("\n");

        try {
          await navigator.clipboard.writeText(text);
          showToast("硬件摘要已复制到剪贴板。");
        } catch (error) {
          showToast("浏览器未授权剪贴板，已在页面内保留导出入口。");
        }
      });

      document.getElementById("startBenchmark").addEventListener("click", () => {
        showToast("性能评测已启动，预计 3 分钟后完成。");
        pushQueue("pressure", "整机评测进行中，正在采集 CPU / GPU / 磁盘数据。");
      });
      document.getElementById("openSettings").addEventListener("click", () => {
        showModule("monitor");
        document.getElementById("cpuThreshold").focus();
      });
      document.getElementById("openExport").addEventListener("click", () => openModal("export"));
      document.getElementById("runCleanup").addEventListener("click", () => {
        if (cleanupState.selected.size === 0) {
          showToast("请先勾选需要清理的对象。");
          return;
        }
        showToast(`清理任务已启动，预计释放 ${document.getElementById("cleanupSelectedSize").textContent}。`);
        pushQueue("deep-clean", `清理任务已启动，预计释放 ${document.getElementById("cleanupSelectedSize").textContent}。`);
      });
      document.getElementById("scanDrivers").addEventListener("click", () => {
        showToast("驱动扫描已启动，正在比对版本库。");
      });
      document.getElementById("installAllDrivers").addEventListener("click", () => openModal("permission"));

      document.getElementById("openFloatingToggle").addEventListener("click", () => {
        floatingVisible = !floatingVisible;
        document.getElementById("floatingWidget").classList.toggle("hidden", !floatingVisible);
        showToast(floatingVisible ? "悬浮监控面板已显示。" : "悬浮监控面板已隐藏。");
      });
      floatingWidget.addEventListener("pointerdown", (event) => {
        if (isFloatingInline() || event.button !== 0) return;

        const rect = floatingWidget.getBoundingClientRect();
        floatingDrag.active = true;
        floatingDrag.offsetX = event.clientX - rect.left;
        floatingDrag.offsetY = event.clientY - rect.top;
        floatingWidget.classList.add("dragging");
        floatingWidget.setPointerCapture(event.pointerId);
        resetFloatingTilt();
        event.preventDefault();
      });

      floatingWidget.addEventListener("pointermove", (event) => {
        if (floatingDrag.active) {
          positionFloatingWidget(event.clientX - floatingDrag.offsetX, event.clientY - floatingDrag.offsetY);
          return;
        }

        updateFloatingTilt(event.clientX, event.clientY);
      });

      function stopFloatingDrag(event) {
        if (!floatingDrag.active) return;
        floatingDrag.active = false;
        floatingWidget.classList.remove("dragging");
        if (floatingWidget.hasPointerCapture(event.pointerId)) {
          floatingWidget.releasePointerCapture(event.pointerId);
        }
      }

      floatingWidget.addEventListener("pointerup", stopFloatingDrag);
      floatingWidget.addEventListener("pointercancel", stopFloatingDrag);
      floatingWidget.addEventListener("pointerleave", () => {
        if (!floatingDrag.active) resetFloatingTilt();
      });
      window.addEventListener("blur", resetFloatingTilt);
      window.addEventListener("resize", () => syncFloatingWidgetPosition());

      renderCleanupTable();
      renderDriverTable();
      renderQueue();
      syncFloatingWidgetPosition(true);
      updateFloatingDisplay(12, 67);
      renderFloatingOrb();
      refreshCharts();
      window.setInterval(refreshCharts, 3000);
    
