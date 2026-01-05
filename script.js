document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    // Get all images
    const images = Array.from(track.children);
    if (images.length === 0) return;

    // Carousel state
    let currentIndex = 0;
    const intervalTime = 3700; // 3.7 seconds

    // Function to move to the next slide
    function nextSlide() {
        currentIndex++;
        
        // Loop back to start if at the end
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        // Apply transform to slide
        // We use percentage logic since each image is width: 100% of parent
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Start the interval
    setInterval(nextSlide, intervalTime);
});
