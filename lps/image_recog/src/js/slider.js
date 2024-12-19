document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // 自動スライド用のタイマー
    let slideInterval = setInterval(nextSlide, 2000);

    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        // ドットの更新
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // インターバルのリセット
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // イベントリスナーの設定
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // ドットクリックでのスライド切り替え
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // スライダーにマウスが乗った時は自動スライドを停止
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    // スライダーからマウスが離れた時は自動スライドを再開
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
});