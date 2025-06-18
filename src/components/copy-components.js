document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy").forEach(function (btn) {
    // 버튼 클릭 애니메이션을 위한 CSS 스타일 추가
    btn.style.transition = "transform 0.1s ease, box-shadow 0.1s ease";

    btn.addEventListener("click", function (e) {
      // 버튼 눌림 애니메이션 효과
      addClickAnimation(btn);

      const parent = btn.closest(".component-wrapper");
      if (!parent) return;

      // 부모 요소를 복제하고 버튼 제거
      const clone = parent.cloneNode(true);
      const btnInClone = clone.querySelector(".copy");
      if (btnInClone) btnInClone.remove();

      // HTML 내용 가져오기 (내부 요소만)
      const html = clone.innerHTML.trim();

      // 클립보드로 복사
      const copyToClipboard = () => {
        if (navigator.clipboard) {
          return navigator.clipboard.writeText(html);
        } else {
          // 구형 브라우저를 위한 대체 방법
          return new Promise((resolve) => {
            const textarea = document.createElement("textarea");
            textarea.value = html;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            resolve();
          });
        }
      };

      // 툴팁 표시
      copyToClipboard()
        .then(() => {
          showTooltip(btn, "Copied!");
        })
        .catch(() => {
          showTooltip(btn, "Copy failed!");
        });
    });
  });
});

// 버튼 클릭 애니메이션 함수
function addClickAnimation(button) {
  // 눌림 효과: 크기 축소 및 그림자 감소
  button.style.transform = "scale(0.95)";
  button.style.filter = "brightness(0.9)";

  // 150ms 후 원래 상태로 복원
  setTimeout(() => {
    button.style.transform = "scale(1)";
    button.style.filter = "brightness(1)";
  }, 150);
}

function showTooltip(element, message) {
  // 기존 툴팁이 있으면 제거
  const existingTooltip = element.querySelector(".copy-tooltip");
  if (existingTooltip) {
    existingTooltip.remove();
  }

  // 툴팁 요소 생성
  const tooltip = document.createElement("span");
  tooltip.className = "copy-tooltip";
  tooltip.textContent = message;
  tooltip.style.cssText = `
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;

  // 화살표 추가
  const arrow = document.createElement("div");
  arrow.style.cssText = `
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
  `;
  tooltip.appendChild(arrow);

  // 버튼이 상대 위치를 갖도록 설정
  const originalPosition = element.style.position;
  if (getComputedStyle(element).position === "static") {
    element.style.position = "relative";
  }

  // 버튼에 툴팁 추가
  element.appendChild(tooltip);

  // 애니메이션과 함께 툴팁 표시
  setTimeout(() => {
    tooltip.style.opacity = "1";
  }, 10);

  // 2초 후 툴팁 숨기기
  setTimeout(() => {
    tooltip.style.opacity = "0";
    setTimeout(() => {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
      // 원래 위치 스타일로 복원
      if (originalPosition) {
        element.style.position = originalPosition;
      } else if (getComputedStyle(element).position === "relative") {
        element.style.position = "";
      }
    }, 300);
  }, 2000);
}
