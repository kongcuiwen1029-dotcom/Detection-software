const moduleMeta = {
  overview: { title: "总览首页", subtitle: "CPU、内存、磁盘、预计可用时长" },
  hosts: { title: "主机监控", subtitle: "主机列表" },
  processes: { title: "进程分析", subtitle: "高占用进程" },
  disks: { title: "磁盘趋势", subtitle: "磁盘空间与预计可用时长" },
  alerts: { title: "告警中心", subtitle: "告警状态处理" },
  settings: { title: "系统设置", subtitle: "阈值与白名单" }
};

const riskWeight = { high: 3, medium: 2, low: 1 };

let hosts = [
  {
    id: "host-01",
    name: "SCADA-APP-01",
    ip: "10.10.2.14",
    os: "Windows 10",
    status: "异常",
    baseCpu: 72,
    baseMemory: 68,
    baseDisk: 81,
    cpu: 72,
    memory: 68,
    disk: 81,
    daysLeft: 12,
    temp: 67,
    partitions: [
      { id: "disk-01", name: "C:", freeText: "142 GB", growth: 5.2, risk: "medium", usedBase: 81, used: 81, daysLeft: 22, logDir: "C:\\DCS\\logs" },
      { id: "disk-02", name: "D:", freeText: "89 GB", growth: 7.4, risk: "high", usedBase: 86, used: 86, daysLeft: 12, logDir: "D:\\DCS\\history" }
    ]
  },
  {
    id: "host-02",
    name: "HIST-DB-01",
    ip: "10.10.2.31",
    os: "Windows 11",
    status: "在线",
    baseCpu: 58,
    baseMemory: 76,
    baseDisk: 88,
    cpu: 58,
    memory: 76,
    disk: 88,
    daysLeft: 7,
    temp: 63,
    partitions: [
      { id: "disk-03", name: "E:", freeText: "64 GB", growth: 8.9, risk: "high", usedBase: 88, used: 88, daysLeft: 7, logDir: "E:\\archive\\log" }
    ]
  },
  {
    id: "host-03",
    name: "KYLIN-COLLECT-01",
    ip: "10.10.8.18",
    os: "中标麒麟",
    status: "在线",
    baseCpu: 49,
    baseMemory: 54,
    baseDisk: 63,
    cpu: 49,
    memory: 54,
    disk: 63,
    daysLeft: 39,
    temp: 56,
    partitions: [
      { id: "disk-04", name: "/var", freeText: "208 GB", growth: 2.6, risk: "medium", usedBase: 63, used: 63, daysLeft: 39, logDir: "/var/log/dcs" }
    ]
  },
  {
    id: "host-04",
    name: "BATCH-TASK-02",
    ip: "10.10.5.42",
    os: "Windows 10",
    status: "在线",
    baseCpu: 66,
    baseMemory: 61,
    baseDisk: 73,
    cpu: 66,
    memory: 61,
    disk: 73,
    daysLeft: 23,
    temp: 61,
    partitions: [
      { id: "disk-05", name: "G:", freeText: "268 GB", growth: 2.2, risk: "low", usedBase: 59, used: 59, daysLeft: 48, logDir: "G:\\archive" }
    ]
  },
  {
    id: "host-05",
    name: "ARCHIVE-NODE-01",
    ip: "10.10.6.55",
    os: "Windows 11",
    status: "离线",
    baseCpu: 18,
    baseMemory: 44,
    baseDisk: 52,
    cpu: 18,
    memory: 44,
    disk: 52,
    daysLeft: 95,
    temp: 44,
    partitions: [
      { id: "disk-06", name: "H:", freeText: "441 GB", growth: 0.8, risk: "low", usedBase: 52, used: 52, daysLeft: 95, logDir: "H:\\archive\\log" }
    ]
  }
];

let processes = [
  { id: "proc-01", name: "historiansvc.exe", hostId: "host-01", cpu: 43, memory: 3.8, durationMinutes: 46, risk: "high", whitelisted: true },
  { id: "proc-02", name: "compress-archive.exe", hostId: "host-02", cpu: 36, memory: 2.6, durationMinutes: 19, risk: "medium", whitelisted: false },
  { id: "proc-03", name: "dcslogd", hostId: "host-03", cpu: 27, memory: 1.4, durationMinutes: 72, risk: "medium", whitelisted: true },
  { id: "proc-04", name: "temp-cleaner.exe", hostId: "host-04", cpu: 18, memory: 1.1, durationMinutes: 12, risk: "low", whitelisted: false },
  { id: "proc-05", name: "oracle.exe", hostId: "host-02", cpu: 31, memory: 5.7, durationMinutes: 58, risk: "high", whitelisted: true }
];

let alerts = [
  { id: "alert-01", time: "10:32", hostId: "host-01", type: "CPU 持续高占用", severity: "high", status: "未处理" },
  { id: "alert-02", time: "10:28", hostId: "host-02", type: "磁盘增长过快", severity: "high", status: "已确认" },
  { id: "alert-03", time: "10:21", hostId: "host-03", type: "日志目录增长", severity: "medium", status: "未处理" },
  { id: "alert-04", time: "10:18", hostId: "host-04", type: "内存偏高", severity: "medium", status: "已忽略" }
];

let whitelistEntries = [
  { id: "white-01", processName: "historiansvc.exe", path: "C:\\DCS\\bin\\historiansvc.exe", hostType: "Windows 10", protectionLevel: "关键业务", remark: "历史采集" },
  { id: "white-02", processName: "dcslogd", path: "/usr/local/dcs/bin/dcslogd", hostType: "中标麒麟", protectionLevel: "系统核心", remark: "日志采集" }
];

const thresholdConfig = {
  cpuThreshold: 82,
  memoryThreshold: 85,
  diskThreshold: 88,
  durationThreshold: 10
};

const hostState = { page: 1, pageSize: 4, search: "", os: "all", sort: "cpu-desc" };
const processState = { page: 1, pageSize: 4, search: "", risk: "all", whitelist: "all", sort: "cpu-desc" };
const diskState = { page: 1, pageSize: 4, hostId: "all", risk: "all", sort: "days-asc" };
const alertState = { page: 1, pageSize: 4, search: "", status: "all", risk: "all" };

let pendingAction = null;
let liveTick = 0;

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

const floatingMotion = { currentX: 0, currentY: 0, targetX: 0, targetY: 0 };
const floatingDrag = { active: false, offsetX: 0, offsetY: 0, initialized: false };
let overviewResizeFrame = 0;

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
const overviewHeatTooltip = document.getElementById("overviewHeatTooltip");

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getCssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function nowTime() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
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

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastStack.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2200);
}

function openModal(action) {
  pendingAction = action;
  modalTitle.textContent = action.title;
  modalDescription.textContent = action.description;
  modalConsent.checked = false;
  modalOverlay.classList.add("show");
}

function closeModal() {
  modalOverlay.classList.remove("show");
  pendingAction = null;
}

function openDrawer(detail) {
  document.getElementById("detailTitle").textContent = detail.title;
  document.getElementById("detailDescription").textContent = detail.description;
  document.getElementById("detailScope").textContent = detail.scope;
  document.getElementById("detailAction").textContent = detail.action;
  detailDrawerOverlay.classList.add("show");
}

function formatRiskBadge(risk) {
  if (risk === "high") return '<span class="risk-badge high">高</span>';
  if (risk === "medium") return '<span class="risk-badge medium">中</span>';
  return '<span class="risk-badge low">低</span>';
}

function formatStatusBadge(status) {
  if (status === "异常") return '<span class="status-badge danger">异常</span>';
  if (status === "未处理") return '<span class="status-badge danger">未处理</span>';
  if (status === "已确认") return '<span class="status-badge warning">已确认</span>';
  if (status === "离线") return '<span class="status-badge warning">离线</span>';
  if (status === "已忽略" || status === "已关闭" || status === "在线") {
    return `<span class="status-badge normal">${status}</span>`;
  }
  return `<span class="status-badge normal">${status}</span>`;
}

function getHostById(id) {
  return hosts.find((host) => host.id === id);
}

function getAllDisks() {
  return hosts.flatMap((host) =>
    host.partitions.map((disk) => ({
      ...disk,
      hostId: host.id,
      hostName: host.name
    }))
  );
}

function getHeatCellDisplayStatus(fillColor) {
  const normalized = String(fillColor || "").toLowerCase();
  const abnormalColors = new Set(["#ffd028", "#ff2f4d", "#ff4564", "#b63863", "#742f5f"]);
  return abnormalColors.has(normalized) ? "异常" : "在线";
}

function getHostHealthSummary(host, displayStatus) {
  if (displayStatus === "异常") {
    return `主机资源波动明显，当前 CPU ${host.cpu}% / 内存 ${host.memory}% / 磁盘 ${host.disk}% ，需要尽快处理高负载项。`;
  }
  if (host.daysLeft <= 7) {
    return `磁盘余量进入紧张区，按照当前增长趋势预计 ${host.daysLeft} 天后触达容量阈值。`;
  }
  if (host.disk >= thresholdConfig.diskThreshold) {
    return `磁盘使用率已达 ${host.disk}% ，短期内存在容量告警风险，建议尽快安排清理。`;
  }
  if (host.memory >= thresholdConfig.memoryThreshold) {
    return `内存占比持续偏高，当前已达 ${host.memory}% ，建议核查高占用进程与缓存使用情况。`;
  }
  if (host.cpu >= thresholdConfig.cpuThreshold) {
    return `CPU 占比接近阈值，当前已达 ${host.cpu}% ，建议关注批处理任务与异常进程。`;
  }
  return "主机当前在线且整体运行平稳，核心指标处于可控区间，建议保持持续观察。";
}

function getHostRecommendedAction(host, displayStatus) {
  if (displayStatus === "异常") {
    return "优先打开主机详情定位高占用进程，并结合告警中心确认是否需要限流或重启相关服务。";
  }
  if (host.daysLeft <= 7 || host.disk >= thresholdConfig.diskThreshold) {
    return "安排磁盘清理或日志归档任务，必要时扩容对应分区，避免业务日志写满。";
  }
  if (host.memory >= thresholdConfig.memoryThreshold) {
    return "检查内存热点进程与缓存策略，必要时在维护窗口执行进程重启或策略调优。";
  }
  if (host.cpu >= thresholdConfig.cpuThreshold) {
    return "排查定时任务和高占用进程，必要时调整批任务执行时段或增加资源配额。";
  }
  return "维持当前监控策略，并继续观察趋势变化；若指标持续抬升，可提前创建巡检任务。";
}

function positionOverviewHeatTooltip(clientX, clientY) {
  if (!overviewHeatTooltip) return;
  const wrap = overviewHeatTooltip.parentElement;
  if (!wrap) return;
  const wrapRect = wrap.getBoundingClientRect();
  const tooltipRect = overviewHeatTooltip.getBoundingClientRect();
  const localX = clientX - wrapRect.left;
  const localY = clientY - wrapRect.top;
  const maxLeft = Math.max(12, wrapRect.width - tooltipRect.width - 12);
  const belowTop = localY + 18;
  const aboveTop = localY - tooltipRect.height - 18;
  const preferredTop = belowTop <= wrapRect.height - tooltipRect.height - 12 ? belowTop : aboveTop;

  overviewHeatTooltip.style.left = `${clamp(localX + 18, 12, maxLeft)}px`;
  overviewHeatTooltip.style.top = `${clamp(preferredTop, 12, Math.max(12, wrapRect.height - tooltipRect.height - 12))}px`;
}

function hideOverviewHeatTooltip() {
  if (!overviewHeatTooltip) return;
  overviewHeatTooltip.classList.remove("show");
  overviewHeatTooltip.setAttribute("aria-hidden", "true");
  document.querySelectorAll("#overviewHeatmap polygon.is-active").forEach((cell) => cell.classList.remove("is-active"));
}

function showOverviewHeatTooltip(host, polygon, clientX, clientY) {
  if (!overviewHeatTooltip) return;
  const displayStatus = getHeatCellDisplayStatus(polygon.getAttribute("fill"));

  overviewHeatTooltip.innerHTML = `
    <div class="overview-heat-tooltip-head">
      <h4 class="overview-heat-tooltip-title">${host.name}</h4>
      ${formatStatusBadge(displayStatus)}
    </div>
    <div class="overview-heat-tooltip-summary">
      <span class="overview-heat-tooltip-label">摘要</span>
      <p>${getHostHealthSummary(host, displayStatus)}</p>
    </div>
    <div class="overview-heat-tooltip-metrics">
      <div class="overview-heat-tooltip-metric"><span>CPU 占比</span><strong>${host.cpu}%</strong></div>
      <div class="overview-heat-tooltip-metric"><span>内存占比</span><strong>${host.memory}%</strong></div>
      <div class="overview-heat-tooltip-metric"><span>磁盘占比</span><strong>${host.disk}%</strong></div>
      <div class="overview-heat-tooltip-metric"><span>剩余使用天数</span><strong>${host.daysLeft} 天</strong></div>
    </div>
    <div class="overview-heat-tooltip-action">
      <span class="overview-heat-tooltip-label">建议动作</span>
      <p>${getHostRecommendedAction(host, displayStatus)}</p>
    </div>
  `;

  document.querySelectorAll("#overviewHeatmap polygon.is-active").forEach((cell) => cell.classList.remove("is-active"));
  polygon.classList.add("is-active");
  overviewHeatTooltip.classList.add("show");
  overviewHeatTooltip.setAttribute("aria-hidden", "false");
  positionOverviewHeatTooltip(clientX, clientY);
}

function createWave(base, amplitude, points, offset, min, max) {
  return Array.from({ length: points }, (_, index) => {
    const value = base + Math.sin((index + offset) / 2.4) * amplitude + Math.cos((index + offset) / 4.6) * amplitude * 0.4;
    return clamp(Math.round(value), min, max);
  });
}

function renderGauge(targetId, value) {
  const svg = document.getElementById(targetId);
  if (!svg) return;

  const safeValue = clamp(value, 0, 100);
  const center = 160;
  const radius = 118;
  const circumference = 2 * Math.PI * radius;
  const progress = (safeValue / 100) * circumference;
  const dashArray = `${progress} ${circumference - progress}`;

  svg.innerHTML = `
    <defs>
      <linearGradient id="${targetId}-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00f0f2"></stop>
        <stop offset="52%" stop-color="#1f9eff"></stop>
        <stop offset="76%" stop-color="#ff6b2d"></stop>
        <stop offset="100%" stop-color="#8e2dff"></stop>
      </linearGradient>
      <filter id="${targetId}-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="4.5" result="blur"></feGaussianBlur>
        <feMerge>
          <feMergeNode in="blur"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="rgba(36, 40, 79, 0.9)" stroke-width="12"></circle>
    <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="rgba(0, 240, 242, 0.14)" stroke-width="16" stroke-dasharray="${dashArray}" stroke-linecap="round" filter="url(#${targetId}-glow)"></circle>
    <circle cx="${center}" cy="${center}" r="${radius}" fill="none" stroke="url(#${targetId}-gradient)" stroke-width="10" stroke-dasharray="${dashArray}" stroke-linecap="round"></circle>
  `;
}

function renderGaugeTicks(targetId) {
  const svg = document.getElementById(targetId);
  if (!svg) return;

  const center = 180;
  const innerRadius = 149;
  const outerRadius = 166;
  const tickCount = 96;

  const lines = Array.from({ length: tickCount }, (_, index) => {
    const angle = ((index * (360 / tickCount) - 90) * Math.PI) / 180;
    const x1 = center + Math.cos(angle) * innerRadius;
    const y1 = center + Math.sin(angle) * innerRadius;
    const x2 = center + Math.cos(angle) * outerRadius;
    const y2 = center + Math.sin(angle) * outerRadius;
    const opacity = index % 4 === 0 ? 0.96 : 0.84;

    return `<line x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke="rgba(88, 241, 255, ${opacity})" stroke-width="1" stroke-linecap="round"></line>`;
  }).join("");

  svg.innerHTML = lines;
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

function renderGradientSparkline(targetId, values, stops) {
  const svg = document.getElementById(targetId);
  if (!svg) return;

  const width = 272;
  const height = 30;
  const step = width / (values.length - 1);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const gradientId = `${targetId}-gradient`;
  const normalize = (value) => {
    const range = max - min || 1;
    return height - ((value - min) / range) * 18 - 6;
  };
  const path = values.map((value, index) => `${index === 0 ? "M" : "L"} ${index * step} ${normalize(value)}`).join(" ");
  const endX = (values.length - 1) * step;
  const endY = normalize(values[values.length - 1]);

  svg.innerHTML = `
    <defs>
      <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
        ${stops.map((stop) => `<stop offset="${stop.offset}" stop-color="${stop.color}"></stop>`).join("")}
      </linearGradient>
    </defs>
    <path d="${path}" fill="none" stroke="url(#${gradientId})" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="${endX}" cy="${endY}" r="3.4" fill="#13172f" stroke="${stops[stops.length - 1].color}" stroke-width="2.2"></circle>
  `;
}

function renderDaysSegments(targetId, daysLeft) {
  const container = document.getElementById(targetId);
  if (!container) return;

  const totalSegments = 13;
  const amberCount = clamp(Math.round(totalSegments - daysLeft / 3), 1, totalSegments);
  container.innerHTML = Array.from({ length: totalSegments }, (_, index) => `<span class="${index < amberCount ? "active" : ""}"></span>`).join("");
}

function createHexPoints(cx, cy, radius) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = ((60 * index - 30) * Math.PI) / 180;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

function pseudoNoise(x, y, seed) {
  const value = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return value - Math.floor(value);
}

function gaussian(nx, ny, cx, cy, spreadX, spreadY) {
  const dx = (nx - cx) / spreadX;
  const dy = (ny - cy) / spreadY;
  return Math.exp(-(dx * dx + dy * dy));
}

function pickOverviewHeatColor(nx, ny, stats) {
  const noise = pseudoNoise(nx * 80 + liveTick * 0.8, ny * 80, stats.memoryAverage * 0.02);
  const coolPrimary = gaussian(nx, ny, 0.08, 0.82, 0.18, 0.26);
  const coolSecondary = gaussian(nx, ny, 0.22, 0.48, 0.14, 0.28);
  const hotPrimary = gaussian(nx, ny, 0.78, 0.18, 0.22, 0.18);
  const hotSecondary = gaussian(nx, ny, 0.62, 0.34, 0.18, 0.2);
  const valley = gaussian(nx, ny, 0.45, 0.14, 0.18, 0.13) + gaussian(nx, ny, 0.84, 0.72, 0.16, 0.14) * 0.3;

  const cool = (coolPrimary * 0.92 + coolSecondary * 0.68) * (0.64 + stats.cpuAverage / 210);
  const hot = (hotPrimary * 0.94 + hotSecondary * 0.62) * (0.62 + stats.diskAverage / 180);

  if (noise < 0.035 + valley * 0.08) return "#161937";

  if (hot > cool && hot > 0.15) {
    const level = hot + noise * 0.18;
    if (level > 0.94) return "#ffd028";
    if (level > 0.78) return "#ff2f4d";
    if (level > 0.62) return "#ff4564";
    if (level > 0.46) return "#b63863";
    if (level > 0.3) return "#742f5f";
    return "#3a2a59";
  }

  if (cool >= hot && cool > 0.15) {
    const level = cool + noise * 0.18;
    if (level > 0.94) return "#dde7ff";
    if (level > 0.8) return "#2d80ff";
    if (level > 0.64) return "#4a58ed";
    if (level > 0.48) return "#4842cb";
    if (level > 0.3) return "#2f2d78";
    return "#242552";
  }

  if (noise > 0.92) return "#4a50dc";
  if (noise < 0.12) return "#181a39";
  return "#232554";
}

function renderOverviewHeatmap(targetId, stats) {
  const svg = document.getElementById(targetId);
  if (!svg) return;
  hideOverviewHeatTooltip();

  const rect = svg.getBoundingClientRect();
  const width = Math.max(320, Math.round(rect.width || 1000));
  const height = Math.max(220, Math.round(rect.height || 620));
  const paddingX = 18;
  const paddingY = 14;
  const usableWidth = Math.max(160, width - paddingX * 2);
  const usableHeight = Math.max(120, height - paddingY * 2);
  const radius = clamp(Math.min(usableWidth / 64, usableHeight / 34), 7.2, 10.4);
  const hexWidth = Math.sqrt(3) * radius;
  const stepX = hexWidth;
  const stepY = radius * 1.5;
  const columns = Math.max(14, Math.floor(usableWidth / hexWidth - 0.5));
  const rows = Math.max(10, Math.floor((usableHeight - radius * 2) / stepY) + 1);
  const gridWidth = (columns + 0.5) * hexWidth;
  const gridHeight = radius * 2 + (rows - 1) * stepY;
  const startX = (width - gridWidth) / 2 + hexWidth / 2;
  const startY = (height - gridHeight) / 2 + radius;

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");

  let cells = "";
  for (let row = 0; row < rows; row += 1) {
    const host = hosts[row % hosts.length];
    for (let column = 0; column < columns; column += 1) {
      const x = startX + column * stepX + (row % 2 ? stepX / 2 : 0);
      const y = startY + row * stepY;
      const nx = column / (columns - 1);
      const ny = row / (rows - 1);
      cells += `<polygon data-host-id="${host.id}" points="${createHexPoints(x, y, radius)}" fill="${pickOverviewHeatColor(nx, ny, stats)}"></polygon>`;
    }
  }

  svg.innerHTML = cells;
  svg.onpointermove = (event) => {
    const polygon = event.target instanceof SVGPolygonElement ? event.target : null;
    if (!polygon) {
      hideOverviewHeatTooltip();
      return;
    }
    const host = getHostById(polygon.dataset.hostId);
    if (!host) {
      hideOverviewHeatTooltip();
      return;
    }
    showOverviewHeatTooltip(host, polygon, event.clientX, event.clientY);
  };
  svg.onpointerleave = hideOverviewHeatTooltip;
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

function mutateLiveData() {
  liveTick += 1;

  hosts = hosts.map((host, index) => {
    if (host.status === "离线") return host;

    const cpu = clamp(Math.round(host.baseCpu + Math.sin((liveTick + index) / 1.9) * 6), 12, 97);
    const memory = clamp(Math.round(host.baseMemory + Math.cos((liveTick + index) / 2.4) * 4), 24, 96);
    const disk = clamp(Math.round(host.baseDisk + Math.sin((liveTick + index) / 5) * 2), 30, 96);
    const daysLeft = clamp(Math.round((100 - disk) * 0.95), 2, 99);
    const temp = clamp(Math.round(46 + cpu * 0.28), 42, 88);

    return {
      ...host,
      cpu,
      memory,
      disk,
      daysLeft,
      temp,
      partitions: host.partitions.map((diskItem, diskIndex) => {
        const used = clamp(Math.round(diskItem.usedBase + Math.cos((liveTick + index + diskIndex) / 3) * 2), 40, 96);
        return {
          ...diskItem,
          used,
          daysLeft: clamp(Math.round((100 - used) * 0.9), 2, 99)
        };
      })
    };
  });

  processes = processes.map((process, index) => ({
    ...process,
    cpu: clamp(Math.round(process.cpu + Math.sin((liveTick + index) / 2) * 2), 4, 95),
    memory: Number.parseFloat(clamp(process.memory + Math.cos((liveTick + index) / 3) * 0.1, 0.8, 8).toFixed(1))
  }));
}

function renderOverview() {
  const disks = getAllDisks();
  const cpuAverage = Math.round(hosts.reduce((sum, host) => sum + host.cpu, 0) / hosts.length);
  const memoryAverage = Math.round(hosts.reduce((sum, host) => sum + host.memory, 0) / hosts.length);
  const diskAverage = Math.round(disks.reduce((sum, disk) => sum + disk.used, 0) / disks.length);
  const minDays = Math.min(...disks.map((disk) => disk.daysLeft));
  const memoryTrend = createWave(memoryAverage, 6, 18, liveTick + 1.5, 24, 96);
  const diskTrend = createWave(diskAverage, 4, 18, liveTick + 2.8, 36, 98);

  const overviewCpuValue = document.getElementById("overviewCpuValue");
  overviewCpuValue.textContent = `${cpuAverage}`;
  overviewCpuValue.parentElement?.setAttribute("data-digits", String(`${cpuAverage}`.length));
  document.getElementById("overviewMemoryValue").textContent = `${memoryAverage}%`;
  document.getElementById("overviewDiskValue").textContent = `${diskAverage}%`;
  document.getElementById("overviewDaysValue").textContent = `${minDays}天`;
  document.getElementById("overviewMemoryHint").textContent = `${memoryTrend[memoryTrend.length - 1]}%`;
  document.getElementById("overviewDiskHint").textContent = `${diskTrend[diskTrend.length - 1]}%`;

  renderGaugeTicks("overviewCpuTicks");
  renderGauge("overviewCpuRing", cpuAverage);
  renderGradientSparkline("overviewMemorySpark", memoryTrend, [
    { offset: "0%", color: "#00a7ff" },
    { offset: "52%", color: "#3856ff" },
    { offset: "100%", color: "#7affd6" }
  ]);
  renderGradientSparkline("overviewDiskSpark", diskTrend, [
    { offset: "0%", color: "#00a7ff" },
    { offset: "65%", color: "#3de6ff" },
    { offset: "100%", color: "#8dfff0" }
  ]);
  renderDaysSegments("overviewDaysSegments", minDays);
  renderOverviewHeatmap("overviewHeatmap", { cpuAverage, memoryAverage, diskAverage, minDays });
}

function renderDiskHostOptions() {
  const select = document.getElementById("diskHostFilter");
  const currentValue = select.value || "all";
  select.innerHTML = `<option value="all">全部主机</option>${hosts
    .map((host) => `<option value="${host.id}">${host.name}</option>`)
    .join("")}`;
  select.value = hosts.some((host) => host.id === currentValue) ? currentValue : "all";
}

function renderHostTable() {
  let filtered = hosts.filter((host) => {
    const keyword = hostState.search.trim().toLowerCase();
    const matchesKeyword = !keyword || [host.name, host.ip].join(" ").toLowerCase().includes(keyword);
    const matchesOs = hostState.os === "all" || host.os === hostState.os;
    return matchesKeyword && matchesOs;
  });

  filtered = filtered.sort((a, b) => {
    if (hostState.sort === "memory-desc") return b.memory - a.memory;
    if (hostState.sort === "disk-desc") return b.disk - a.disk;
    return b.cpu - a.cpu;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / hostState.pageSize));
  hostState.page = Math.min(hostState.page, totalPages);
  const startIndex = (hostState.page - 1) * hostState.pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + hostState.pageSize);

  document.getElementById("hostRows").innerHTML = pageItems
    .map(
      (host) => `
        <div class="table-body-row">
          <div class="row-title"><strong>${host.name}</strong></div>
          <span>${host.ip}</span>
          <span>${host.os}</span>
          <span>${formatStatusBadge(host.status)}</span>
          <strong>${host.cpu}%</strong>
          <strong>${host.memory}%</strong>
          <strong>${host.disk}%</strong>
          <strong>${host.daysLeft} 天</strong>
          <div class="row-actions">
            <button class="table-action" data-action="open-detail" data-kind="host" data-id="${host.id}">详情</button>
          </div>
        </div>
      `
    )
    .join("");

  document.getElementById("hostSummary").textContent = `共 ${filtered.length} 台`;
  renderPagination("hostPagination", totalPages, hostState.page, (page) => {
    hostState.page = page;
    renderHostTable();
  });
}

function renderProcessTable() {
  let filtered = processes.filter((process) => {
    const host = getHostById(process.hostId);
    const keyword = processState.search.trim().toLowerCase();
    const matchesKeyword = !keyword || [process.name, host.name].join(" ").toLowerCase().includes(keyword);
    const matchesRisk = processState.risk === "all" || process.risk === processState.risk;
    const matchesWhite =
      processState.whitelist === "all" ||
      (processState.whitelist === "hit" && process.whitelisted) ||
      (processState.whitelist === "miss" && !process.whitelisted);
    return matchesKeyword && matchesRisk && matchesWhite;
  });

  filtered = filtered.sort((a, b) => {
    if (processState.sort === "memory-desc") return b.memory - a.memory;
    if (processState.sort === "duration-desc") return b.durationMinutes - a.durationMinutes;
    return b.cpu - a.cpu;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / processState.pageSize));
  processState.page = Math.min(processState.page, totalPages);
  const startIndex = (processState.page - 1) * processState.pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + processState.pageSize);

  document.getElementById("processRows").innerHTML = pageItems
    .map((process) => {
      const host = getHostById(process.hostId);
      return `
        <div class="table-body-row">
          <div class="row-title"><strong>${process.name}</strong></div>
          <span>${host.name}</span>
          <strong>${process.cpu}%</strong>
          <strong>${process.memory.toFixed(1)} GB</strong>
          <span>${process.durationMinutes} 分钟</span>
          <span>${process.whitelisted ? '<span class="status-badge normal">已保护</span>' : '<span class="status-badge warning">未命中</span>'}</span>
          <div class="row-actions">
            <button class="table-action" data-action="open-detail" data-kind="process" data-id="${process.id}">详情</button>
            <button class="table-action primary" data-action="toggle-whitelist" data-id="${process.id}">${process.whitelisted ? "查看白名单" : "加入白名单"}</button>
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById("processSummary").textContent = `共 ${filtered.length} 条`;
  renderPagination("processPagination", totalPages, processState.page, (page) => {
    processState.page = page;
    renderProcessTable();
  });
}

function renderDiskTable() {
  let filtered = getAllDisks().filter((disk) => {
    const matchesHost = diskState.hostId === "all" || disk.hostId === diskState.hostId;
    const matchesRisk = diskState.risk === "all" || disk.risk === diskState.risk;
    return matchesHost && matchesRisk;
  });

  filtered = filtered.sort((a, b) => {
    if (diskState.sort === "usage-desc") return b.used - a.used;
    if (diskState.sort === "growth-desc") return b.growth - a.growth;
    return a.daysLeft - b.daysLeft;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / diskState.pageSize));
  diskState.page = Math.min(diskState.page, totalPages);
  const startIndex = (diskState.page - 1) * diskState.pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + diskState.pageSize);

  document.getElementById("diskRows").innerHTML = pageItems
    .map(
      (disk) => `
        <div class="table-body-row">
          <div class="row-title"><strong>${disk.name}</strong></div>
          <span>${disk.hostName}</span>
          <strong>${disk.used}%</strong>
          <span>${disk.freeText}</span>
          <span>${disk.growth.toFixed(1)} GB/天</span>
          <strong>${disk.daysLeft} 天</strong>
          <div class="row-actions">
            <button class="table-action" data-action="open-detail" data-kind="disk" data-id="${disk.id}">详情</button>
            <button class="table-action primary" data-action="archive-disk" data-id="${disk.id}">整理</button>
          </div>
        </div>
      `
    )
    .join("");

  document.getElementById("diskSummary").textContent = `共 ${filtered.length} 条`;
  renderPagination("diskPagination", totalPages, diskState.page, (page) => {
    diskState.page = page;
    renderDiskTable();
  });
}

function renderAlertTable() {
  let filtered = alerts.filter((alert) => {
    const host = getHostById(alert.hostId);
    const keyword = alertState.search.trim().toLowerCase();
    const matchesKeyword = !keyword || [alert.type, host.name].join(" ").toLowerCase().includes(keyword);
    const matchesStatus = alertState.status === "all" || alert.status === alertState.status;
    const matchesRisk = alertState.risk === "all" || alert.severity === alertState.risk;
    return matchesKeyword && matchesStatus && matchesRisk;
  });

  filtered = filtered.sort((a, b) => riskWeight[b.severity] - riskWeight[a.severity] || b.time.localeCompare(a.time));

  const totalPages = Math.max(1, Math.ceil(filtered.length / alertState.pageSize));
  alertState.page = Math.min(alertState.page, totalPages);
  const startIndex = (alertState.page - 1) * alertState.pageSize;
  const pageItems = filtered.slice(startIndex, startIndex + alertState.pageSize);

  document.getElementById("alertRows").innerHTML = pageItems
    .map((alert) => {
      const host = getHostById(alert.hostId);
      return `
        <div class="table-body-row">
          <span>${alert.time}</span>
          <div class="row-title"><strong>${host.name}</strong></div>
          <span>${alert.type}</span>
          <span>${formatRiskBadge(alert.severity)}</span>
          <span>${formatStatusBadge(alert.status)}</span>
          <div class="row-actions">
            <button class="table-action" data-action="open-detail" data-kind="alert" data-id="${alert.id}">详情</button>
            ${alert.status === "未处理" ? `<button class="table-action" data-action="set-alert-status" data-id="${alert.id}" data-status="已确认">确认</button>` : ""}
            ${alert.status !== "已关闭" ? `<button class="table-action primary" data-action="set-alert-status" data-id="${alert.id}" data-status="已关闭">关闭</button>` : ""}
          </div>
        </div>
      `;
    })
    .join("");

  document.getElementById("alertSummary").textContent = `共 ${filtered.length} 条`;
  renderPagination("alertPagination", totalPages, alertState.page, (page) => {
    alertState.page = page;
    renderAlertTable();
  });
}

function renderWhitelistTable() {
  document.getElementById("whitelistRows").innerHTML = whitelistEntries
    .map(
      (item) => `
        <div class="table-body-row">
          <div class="row-title"><strong>${item.processName}</strong></div>
          <span>${item.path}</span>
          <span>${item.hostType}</span>
          <span>${item.protectionLevel}</span>
          <span>${item.remark}</span>
        </div>
      `
    )
    .join("");
}

function renderBottomBar() {
  const disks = getAllDisks();
  const minDays = Math.min(...disks.map((disk) => disk.daysLeft));
  const hottestHost = hosts.slice().sort((a, b) => b.temp - a.temp)[0];

  updateFloatingDisplay(minDays, hottestHost.temp);
}

function buildDetail(kind, id) {
  if (kind === "host") {
    const host = getHostById(id);
    return {
      title: host.name,
      description: `${host.ip} · ${host.os}`,
      scope: `CPU ${host.cpu}% · 内存 ${host.memory}% · 磁盘 ${host.disk}% · 预计 ${host.daysLeft} 天`,
      action: "继续观察主机资源变化，必要时进入进程分析或磁盘趋势。"
    };
  }

  if (kind === "process") {
    const process = processes.find((item) => item.id === id);
    const host = getHostById(process.hostId);
    return {
      title: process.name,
      description: `${host.name}`,
      scope: `CPU ${process.cpu}% · 内存 ${process.memory.toFixed(1)} GB · 持续 ${process.durationMinutes} 分钟`,
      action: process.whitelisted ? "当前为白名单对象，仅建议观察。" : "可评估是否加入白名单。"
    };
  }

  if (kind === "disk") {
    const disk = getAllDisks().find((item) => item.id === id);
    return {
      title: `${disk.hostName} / ${disk.name}`,
      description: disk.logDir,
      scope: `使用率 ${disk.used}% · 剩余空间 ${disk.freeText} · 增长 ${disk.growth.toFixed(1)} GB/天 · 预计 ${disk.daysLeft} 天`,
      action: "必要时发起日志整理。"
    };
  }

  const alert = alerts.find((item) => item.id === id);
  const host = getHostById(alert.hostId);
  return {
    title: alert.type,
    description: `${host.name} · ${alert.time}`,
    scope: `${alert.status} · ${alert.severity === "high" ? "高风险" : "中低风险"}`,
    action: alert.status === "未处理" ? "建议先确认，再决定是否关闭。" : "当前状态已处理。"
  };
}

function applyPendingAction() {
  if (!pendingAction) return;

  if (pendingAction.type === "archive-disk") {
    const disk = getAllDisks().find((item) => item.id === pendingAction.id);
    showToast(`${disk.hostName} ${disk.name} 已加入整理队列。`);
  }

  if (pendingAction.type === "set-alert-status") {
    const alert = alerts.find((item) => item.id === pendingAction.id);
    alert.status = pendingAction.status;
    showToast(`告警已更新为${pendingAction.status}。`);
    renderAlertTable();
  }

  if (pendingAction.type === "toggle-whitelist") {
    const process = processes.find((item) => item.id === pendingAction.id);
    if (process.whitelisted) {
      openDrawer(buildDetail("process", process.id));
      return;
    }
    const host = getHostById(process.hostId);
    process.whitelisted = true;
    whitelistEntries.unshift({
      id: `white-${Date.now()}`,
      processName: process.name,
      path: host.os === "中标麒麟" ? `/usr/local/${process.name}/${process.name}` : `C:\\Protected\\${process.name}`,
      hostType: host.os,
      protectionLevel: "人工观察",
      remark: "由进程分析加入"
    });
    showToast(`${process.name} 已加入白名单。`);
    renderProcessTable();
    renderWhitelistTable();
  }
}

function renderAll() {
  renderDiskHostOptions();
  renderOverview();
  renderHostTable();
  renderProcessTable();
  renderDiskTable();
  renderAlertTable();
  renderWhitelistTable();
  renderBottomBar();
}

function bindEvents() {
  navButtons.forEach((button) => {
    button.addEventListener("click", () => showModule(button.dataset.moduleTarget));
  });

  const globalRefreshButton = document.getElementById("globalRefresh");
  if (globalRefreshButton) {
    globalRefreshButton.addEventListener("click", () => {
      mutateLiveData();
      renderAll();
      showToast("数据已刷新。");
    });
  }

  document.getElementById("cancelModal").addEventListener("click", closeModal);
  document.getElementById("confirmModal").addEventListener("click", () => {
    if (!modalConsent.checked) {
      showToast("请先确认。");
      return;
    }
    applyPendingAction();
    closeModal();
  });

  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
  });

  detailDrawerOverlay.addEventListener("click", (event) => {
    if (event.target === detailDrawerOverlay) detailDrawerOverlay.classList.remove("show");
  });

  document.getElementById("closeDrawer").addEventListener("click", () => detailDrawerOverlay.classList.remove("show"));

  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;

    const { action, id, kind, status } = actionButton.dataset;

    if (action === "open-detail") {
      openDrawer(buildDetail(kind, id));
      return;
    }

    if (action === "archive-disk") {
      openModal({
        type: "archive-disk",
        id,
        title: "确认日志整理",
        description: "该操作会把目标目录加入整理队列。"
      });
      return;
    }

    if (action === "set-alert-status") {
      openModal({
        type: "set-alert-status",
        id,
        status,
        title: `确认${status}`,
        description: `将当前告警状态更新为“${status}”。`
      });
      return;
    }

    if (action === "toggle-whitelist") {
      const process = processes.find((item) => item.id === id);
      if (process.whitelisted) {
        openDrawer(buildDetail("process", id));
        return;
      }
      openModal({
        type: "toggle-whitelist",
        id,
        title: "白名单操作确认",
        description: "确认将该进程加入白名单。"
      });
    }
  });

  document.getElementById("hostSearch").addEventListener("input", (event) => {
    hostState.search = event.target.value;
    hostState.page = 1;
    renderHostTable();
  });
  document.getElementById("hostOsFilter").addEventListener("change", (event) => {
    hostState.os = event.target.value;
    hostState.page = 1;
    renderHostTable();
  });
  document.getElementById("hostSort").addEventListener("change", (event) => {
    hostState.sort = event.target.value;
    renderHostTable();
  });
  document.getElementById("hostPageSize").addEventListener("change", (event) => {
    hostState.pageSize = Number(event.target.value);
    hostState.page = 1;
    renderHostTable();
  });

  document.getElementById("processSearch").addEventListener("input", (event) => {
    processState.search = event.target.value;
    processState.page = 1;
    renderProcessTable();
  });
  document.getElementById("processRiskFilter").addEventListener("change", (event) => {
    processState.risk = event.target.value;
    processState.page = 1;
    renderProcessTable();
  });
  document.getElementById("processWhiteFilter").addEventListener("change", (event) => {
    processState.whitelist = event.target.value;
    processState.page = 1;
    renderProcessTable();
  });
  document.getElementById("processSort").addEventListener("change", (event) => {
    processState.sort = event.target.value;
    renderProcessTable();
  });
  document.getElementById("processPageSize").addEventListener("change", (event) => {
    processState.pageSize = Number(event.target.value);
    processState.page = 1;
    renderProcessTable();
  });

  document.getElementById("diskHostFilter").addEventListener("change", (event) => {
    diskState.hostId = event.target.value;
    diskState.page = 1;
    renderDiskTable();
  });
  document.getElementById("diskRiskFilter").addEventListener("change", (event) => {
    diskState.risk = event.target.value;
    diskState.page = 1;
    renderDiskTable();
  });
  document.getElementById("diskSort").addEventListener("change", (event) => {
    diskState.sort = event.target.value;
    renderDiskTable();
  });
  document.getElementById("diskPageSize").addEventListener("change", (event) => {
    diskState.pageSize = Number(event.target.value);
    diskState.page = 1;
    renderDiskTable();
  });

  document.getElementById("alertSearch").addEventListener("input", (event) => {
    alertState.search = event.target.value;
    alertState.page = 1;
    renderAlertTable();
  });
  document.getElementById("alertStatusFilter").addEventListener("change", (event) => {
    alertState.status = event.target.value;
    alertState.page = 1;
    renderAlertTable();
  });
  document.getElementById("alertRiskFilter").addEventListener("change", (event) => {
    alertState.risk = event.target.value;
    alertState.page = 1;
    renderAlertTable();
  });
  document.getElementById("alertPageSize").addEventListener("change", (event) => {
    alertState.pageSize = Number(event.target.value);
    alertState.page = 1;
    renderAlertTable();
  });

  document.getElementById("thresholdForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const cpu = Number(form.get("cpuThreshold"));
    const memory = Number(form.get("memoryThreshold"));
    const disk = Number(form.get("diskThreshold"));
    const duration = Number(form.get("durationThreshold"));

    if ([cpu, memory, disk, duration].some((item) => Number.isNaN(item))) {
      document.getElementById("thresholdHint").textContent = "请输入合法数值。";
      return;
    }
    if (cpu < 50 || cpu > 95 || memory < 60 || memory > 95 || disk < 70 || disk > 95 || duration <= 0) {
      document.getElementById("thresholdHint").textContent = "阈值超出允许范围。";
      return;
    }

    thresholdConfig.cpuThreshold = cpu;
    thresholdConfig.memoryThreshold = memory;
    thresholdConfig.diskThreshold = disk;
    thresholdConfig.durationThreshold = duration;
    document.getElementById("thresholdHint").textContent = "保存成功。";
    showToast("阈值已保存。");
  });

  document.getElementById("whitelistForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const processName = String(form.get("processName") || "").trim();
    const processPath = String(form.get("processPath") || "").trim();
    const hostType = String(form.get("hostType") || "");
    const protectionLevel = String(form.get("protectionLevel") || "");
    const remark = String(form.get("whiteRemark") || "").trim();

    if (!processName) {
      document.getElementById("whitelistHint").textContent = "进程名称必填。";
      return;
    }
    if (!/^[A-Za-z]:\\/.test(processPath) && !/^\//.test(processPath)) {
      document.getElementById("whitelistHint").textContent = "请输入合法绝对路径。";
      return;
    }
    const duplicated = whitelistEntries.some(
      (item) => item.processName.toLowerCase() === processName.toLowerCase() && item.path.toLowerCase() === processPath.toLowerCase()
    );
    if (duplicated) {
      document.getElementById("whitelistHint").textContent = "规则已存在。";
      return;
    }

    whitelistEntries.unshift({
      id: `white-${Date.now()}`,
      processName,
      path: processPath,
      hostType,
      protectionLevel,
      remark: remark || "手工新增"
    });
    processes = processes.map((process) =>
      process.name.toLowerCase() === processName.toLowerCase() ? { ...process, whitelisted: true } : process
    );
    document.getElementById("whitelistHint").textContent = "保存成功。";
    renderWhitelistTable();
    renderProcessTable();
    event.currentTarget.reset();
    showToast("白名单已保存。");
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
    }
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
  document.addEventListener("pointermove", (event) => {
    if (floatingDrag.active || isFloatingInline()) return;
    updateFloatingTilt(event.clientX, event.clientY);
  });
  document.addEventListener("mouseleave", resetFloatingTilt);
  window.addEventListener("blur", resetFloatingTilt);
  window.addEventListener("resize", () => {
    syncFloatingWidgetPosition();
    window.cancelAnimationFrame(overviewResizeFrame);
    overviewResizeFrame = window.requestAnimationFrame(() => renderOverview());
  });
}

bindEvents();
mutateLiveData();
renderAll();
syncFloatingWidgetPosition(true);
renderFloatingOrb();
window.setInterval(() => {
  mutateLiveData();
  renderAll();
}, 4000);
