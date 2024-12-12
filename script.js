document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const previewArea = document.getElementById("preview");
    const locationOutput = document.getElementById("location-output");

    function handleFile(files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement("img");
                img.src = e.target.result;
                img.style.maxWidth = "100px";
                img.style.margin = "10px";
                previewArea.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.classList.add("highlight");
    });

    dropArea.addEventListener("dragleave", () => {
        dropArea.classList.remove("highlight");
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.classList.remove("highlight");
        const files = e.dataTransfer.files;
        handleFile(files);
    });

    fileInput.addEventListener("change", (e) => {
        handleFile(e.target.files);
    });

    document.getElementById("get-location").addEventListener("click", () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                locationOutput.textContent = `Широта: ${position.coords.latitude}, Долгота: ${position.coords.longitude}`;
            }, () => {
                locationOutput.textContent = "Не удалось получить местоположение.";
            });
        } else {
            locationOutput.textContent = "Геолокация не поддерживается.";
        }
    });

    document.getElementById("file-input-link").addEventListener("click", (e) => {
        e.preventDefault();
        fileInput.click();
    });
});
