document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tablist = document.querySelector('[role="tablist"]');
  const tabpanels = document.querySelectorAll('[role="tabpanel"]');

  // 🔁 탭 변경 처리 함수
  function activateTab(tab) {
    const targetId = tab.getAttribute("aria-controls");

    // 모든 탭 비활성화
    tabs.forEach((t) => {
      t.setAttribute("aria-selected", "false");
      t.setAttribute("tabindex", "-1");
    });

    // 모든 탭 패널 숨김
    tabpanels.forEach((panel) => panel.classList.add("is-hidden"));

    // 선택된 탭 활성화
    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tab.focus();

    // 관련된 탭 패널 표시
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) targetPanel.classList.remove("is-hidden");
  }

  // ✅ 클릭 이벤트로 탭 전환
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateTab(tab);
    });

    // 키보드 왼쪽/오른쪽 화살표로 이동
    tab.addEventListener("keydown", (e) => {
      const index = Array.from(tabs).indexOf(tab);
      let newIndex = index;

      if (e.key === "ArrowRight") {
        newIndex = (index + 1) % tabs.length;
      } else if (e.key === "ArrowLeft") {
        newIndex = (index - 1 + tabs.length) % tabs.length;
      } else {
        return; // 다른 키는 무시
      }

      e.preventDefault();
      activateTab(tabs[newIndex]);
    });
  });
});
