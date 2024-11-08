const canvas = document.getElementById("imageCanvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = 'background-image.png';
backgroundImage.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
};

// Function to wrap and draw text on the canvas, including emojis
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

// Function to generate the canvas image with text and emojis
function generateImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    const caption = document.getElementById("captionInput").value;

    ctx.font = "70px 'Source Sans 3'";
    ctx.fillStyle = "#000";
    ctx.textAlign = "left";

    const padding = 80;
    const maxWidth = canvas.width - padding * 2;
    const x = 130;
    const y = 370;
    const lineHeight = 80;

    wrapText(ctx, caption, x, y, maxWidth, lineHeight);
}

// Function to download the generated image as a PNG
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'custom_image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

// Function to insert an emoji character into the text input field
function insertEmoji(emoji) {
    const captionInput = document.getElementById("captionInput");
    captionInput.value += emoji;
}
