// High-Resolution Greeting Card Generator & Downloader
// Creates a 1080x1080 crisp, royal Diwali card using HTML5 Canvas
// Zero external dependencies, instant download, crisp on all devices!

export function downloadGreetingCard({ senderName, receiverName, message }) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  const sender = senderName?.trim() || 'Well Wisher';
  const receiver = receiverName?.trim() || 'Friend';
  const customMsg = message?.trim() || 'May the divine light of Diwali bring peace, prosperity, health and boundless happiness to you and your family!';

  // 1. Royal Deep Background Gradient (Navy to Maroon)
  const bgGrad = ctx.createRadialGradient(540, 540, 100, 540, 540, 750);
  bgGrad.addColorStop(0, '#260038');
  bgGrad.addColorStop(0.5, '#160024');
  bgGrad.addColorStop(1, '#070010');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1080);

  // 2. Subtle Rangoli Background Watermark
  ctx.save();
  ctx.translate(540, 540);
  ctx.strokeStyle = '#ffd700';
  ctx.globalAlpha = 0.06;
  ctx.lineWidth = 2;
  for (let r = 120; r <= 460; r += 80) {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let i = 0; i < 12; i++) {
    ctx.rotate((Math.PI * 2) / 12);
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.quadraticCurveTo(50, 220, 0, 360);
    ctx.quadraticCurveTo(-50, 220, 0, 80);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Luxurious Double Golden Border with Corner Florets
  ctx.save();
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 4;
  ctx.strokeRect(50, 50, 980, 980);

  ctx.strokeStyle = '#ffb703';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(66, 66, 948, 948);

  // Corner ornaments
  const corners = [
    [50, 50],
    [1030, 50],
    [50, 1030],
    [1030, 1030]
  ];
  corners.forEach(([cx, cy]) => {
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();

  // 4. Draw Center Top Majestic Diya
  drawDiya(ctx, 540, 190, 1.25);

  // 5. Typography: Hindi Festive Motto
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffb703';
  ctx.font = '600 28px "Poppins", sans-serif';
  ctx.fillText('✨ दीपावली की हार्दिक शुभकामनाएं ✨', 540, 280);

  // 6. Main Title: "Happy Diwali"
  ctx.save();
  ctx.font = '900 84px "Playfair Display", Georgia, serif';
  const goldGrad = ctx.createLinearGradient(300, 310, 780, 370);
  goldGrad.addColorStop(0, '#fff3b0');
  goldGrad.addColorStop(0.5, '#ffd700');
  goldGrad.addColorStop(1, '#ff9f1c');
  ctx.fillStyle = goldGrad;
  ctx.shadowColor = 'rgba(255, 183, 3, 0.5)';
  ctx.shadowBlur = 25;
  ctx.fillText('Happy Diwali', 540, 380);
  ctx.restore();

  // 7. Recipient Line
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 48px "Playfair Display", Georgia, serif';
  ctx.fillText(`Dear ${receiver}`, 540, 460);

  // 8. Message Box (Ornamental Parchment Card)
  ctx.save();
  ctx.fillStyle = 'rgba(255, 215, 0, 0.05)';
  ctx.strokeStyle = 'rgba(255, 215, 0, 0.35)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, 160, 520, 760, 240, 24);
  ctx.fill();
  ctx.stroke();

  // Quote marks
  ctx.fillStyle = 'rgba(255, 215, 0, 0.35)';
  ctx.font = '900 70px Georgia, serif';
  ctx.fillText('“', 200, 580);
  ctx.fillText('”', 880, 740);

  // Wrap Message Text
  ctx.fillStyle = '#fff4cc';
  ctx.font = 'italic 30px "Poppins", sans-serif';
  wrapText(ctx, customMsg, 540, 600, 660, 42);
  ctx.restore();

  // 9. Traditional Blessings
  ctx.fillStyle = '#ffb703';
  ctx.font = '600 24px "Poppins", sans-serif';
  ctx.fillText('May your year ahead be blessed with joy, success & good health!', 540, 810);

  // 10. Sender Attribution
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 36px "Poppins", sans-serif';
  ctx.fillText(`With love from: ${sender} 💝`, 540, 880);

  // 11. Trio of bottom Diyas
  drawDiya(ctx, 430, 960, 0.85);
  drawDiya(ctx, 540, 955, 1.0);
  drawDiya(ctx, 650, 960, 0.85);

  // 12. Trigger Instant Download
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeReceiver = receiver.replace(/[^a-zA-Z0-9]/g, '_');
    a.download = `Diwali_Wish_${safeReceiver}.png`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
  }, 'image/png');
}

// Helper: Draw vector Diya on 2D canvas
function drawDiya(ctx, x, y, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // Outer Aura Glow
  const glow = ctx.createRadialGradient(0, -10, 5, 0, -10, 45);
  glow.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
  glow.addColorStop(0.5, 'rgba(255, 140, 0, 0.25)');
  glow.addColorStop(1, 'rgba(255, 60, 0, 0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, -10, 45, 0, Math.PI * 2);
  ctx.fill();

  // Clay Base
  const baseGrad = ctx.createLinearGradient(-35, 10, 35, 30);
  baseGrad.addColorStop(0, '#c85a17');
  baseGrad.addColorStop(0.5, '#8c3506');
  baseGrad.addColorStop(1, '#4a1900');
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.ellipse(0, 18, 38, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  // Clay Rim Gold
  ctx.strokeStyle = '#ffd700';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Flame
  const flameGrad = ctx.createLinearGradient(0, -42, 0, 10);
  flameGrad.addColorStop(0, '#ffffff');
  flameGrad.addColorStop(0.2, '#fff3b0');
  flameGrad.addColorStop(0.55, '#ffb703');
  flameGrad.addColorStop(0.85, '#e63946');
  flameGrad.addColorStop(1, '#963c08');

  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.moveTo(0, -44);
  ctx.bezierCurveTo(-14, -24, -18, -4, 0, 10);
  ctx.bezierCurveTo(18, -4, 14, -24, 0, -44);
  ctx.fill();

  ctx.restore();
}

// Helper: Wrapped text utility
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

// Helper: Rounded Rectangle
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

