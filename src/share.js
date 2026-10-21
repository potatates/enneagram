// "Save as image": the reader's result as a portrait card (1080 x 1350),
// drawn on a canvas in the site's paper, ink, gold and prism light.
(function () {
  const E = window.ENNEAGRAM;
  const W = 1080, H = 1350;
  const PAPER = '#fff9ed', INK = '#4b3f1d', SOFT = '#6b5f40', GOLD = '#b47b00';
  const BODY = '"EB Garamond", Georgia, serif';
  const DISPLAY = '"Old Standard TT", Georgia, serif';

  function spaced(ctx, text, x, y, tracking) {
    // Canvas letter-spacing isn't everywhere yet, so place letters one by one, centered on x.
    const widths = [...text].map((c) => ctx.measureText(c).width);
    const total = widths.reduce((a, b) => a + b, 0) + tracking * (text.length - 1);
    let at = x - total / 2;
    ctx.textAlign = 'left';
    [...text].forEach((c, i) => { ctx.fillText(c, at, y); at += widths[i] + tracking; });
    ctx.textAlign = 'center';
  }

  function prismGradient(ctx, x0, y0, x1, y1, alpha) {
    const g = ctx.createLinearGradient(x0, y0, x1, y1);
    E.enneagram.PRISM.forEach((c, i, a) => g.addColorStop(i / (a.length - 1), c + alpha));
    return g;
  }

  function symbol(ctx, cx, cy, r, type) {
    const p = (n, rr = r) => {
      const [x, y] = E.enneagram.point(n, 50);
      return [cx + x / 50 * rr, cy + y / 50 * rr];
    };
    const poly = (order) => { ctx.beginPath(); order.forEach((n, i) => ctx[i ? 'lineTo' : 'moveTo'](...p(n))); ctx.closePath(); ctx.stroke(); };

    ctx.strokeStyle = INK; ctx.lineWidth = 2; ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1;
    ctx.lineWidth = 2.4; poly([9, 3, 6]); poly([1, 4, 2, 8, 5, 7]);

    // Growth (prism) and stress (dashed ink) arrows from the reader's point.
    const arrow = (to, style, dash, width) => {
      const [x1, y1] = p(type), [x2, y2] = p(to);
      const a = Math.atan2(y2 - y1, x2 - x1), len = Math.hypot(x2 - x1, y2 - y1);
      const sx = x1 + Math.cos(a) * 18, sy = y1 + Math.sin(a) * 18;
      const ex = x1 + Math.cos(a) * (len - 22), ey = y1 + Math.sin(a) * (len - 22);
      ctx.strokeStyle = style; ctx.fillStyle = style; ctx.lineWidth = width; ctx.setLineDash(dash);
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(ex + Math.cos(a) * 14, ey + Math.sin(a) * 14);
      ctx.lineTo(ex + Math.cos(a + 2.5) * 12, ey + Math.sin(a + 2.5) * 12);
      ctx.lineTo(ex + Math.cos(a - 2.5) * 12, ey + Math.sin(a - 2.5) * 12); ctx.closePath(); ctx.fill();
    };
    arrow(E.enneagram.STRESS[type], INK, [9, 9], 3);
    arrow(E.enneagram.GROWTH[type], prismGradient(ctx, cx - r, cy - r, cx + r, cy + r, ''), [], 5);

    ctx.font = `46px ${BODY}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let n = 1; n <= 9; n++) {
      const [x, y] = p(n, r * 1.16);
      ctx.fillStyle = n === type ? GOLD : INK;
      ctx.font = `${n === type ? '600 ' : ''}46px ${BODY}`;
      ctx.fillText(String(n), x, y);
    }
    const [dx, dy] = p(type);
    ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(dx, dy, 11, 0, Math.PI * 2); ctx.fill();
  }

  function wrap(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    for (const w of words) {
      const next = line ? line + ' ' + w : w;
      if (ctx.measureText(next).width > maxWidth && line) { ctx.fillText(line, x, y); y += lineHeight; line = w; }
      else line = next;
    }
    ctx.fillText(line, x, y);
    return y;
  }

  // r: { type, score, verdict } for the leading type.
  async function card(r) {
    const t = E.TYPES.types[r.type];
    try { await Promise.all([`48px ${BODY}`, `600 48px ${BODY}`, `italic 48px ${BODY}`, `48px ${DISPLAY}`].map((f) => document.fonts.load(f))); } catch (e) { /* fall back to Georgia */ }

    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');

    // Paper, warm edges, and a band of prism light from the top right.
    ctx.fillStyle = PAPER; ctx.fillRect(0, 0, W, H);
    const v = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
    v.addColorStop(0, '#b47b0000'); v.addColorStop(1, '#b47b0026');
    ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
    ctx.save();
    // A band of spectrum across the top right, fading at both ends.
    ctx.translate(W * 0.97, H * 0.035); ctx.rotate(-0.42); ctx.filter = 'blur(2px)';
    const band = document.createElement('canvas'); band.width = 600; band.height = 34;
    const b = band.getContext('2d');
    b.fillStyle = prismGradient(b, 0, 0, 0, 34, ''); b.fillRect(0, 0, 600, 34);
    b.globalCompositeOperation = 'destination-in';
    const fade = b.createLinearGradient(0, 0, 600, 0);
    fade.addColorStop(0, '#0000'); fade.addColorStop(0.35, '#000'); fade.addColorStop(0.65, '#000'); fade.addColorStop(1, '#0000');
    b.fillStyle = fade; b.fillRect(0, 0, 600, 34);
    ctx.globalAlpha = 0.3; ctx.drawImage(band, -300, -17);
    ctx.restore();

    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
    ctx.font = `26px ${BODY}`; ctx.fillStyle = SOFT;
    spaced(ctx, 'THE WISDOM OF THE ENNEAGRAM', W / 2, 110, 6);

    ctx.fillStyle = INK; ctx.font = `120px ${DISPLAY}`;
    spaced(ctx, 'Type ' + r.type, W / 2, 250, 18);
    ctx.font = `58px ${DISPLAY}`;
    spaced(ctx, t.name, W / 2, 330, 6);
    ctx.font = `italic 36px ${BODY}`; ctx.fillStyle = SOFT;
    ctx.fillText(t.subtitle, W / 2, 385);

    symbol(ctx, W / 2, 705, 215, r.type);
    ctx.textBaseline = 'alphabetic';

    ctx.fillStyle = INK; ctx.font = `34px ${BODY}`;
    ctx.fillText(t.traits.join('  ·  '), W / 2, 1030);

    const quote = t.motto || t.superego;
    ctx.font = `italic 40px ${BODY}`;
    const y = wrap(ctx, `“${quote}”`, W / 2, 1105, 820, 52);

    ctx.font = `600 34px ${BODY}`; ctx.fillStyle = GOLD;
    ctx.fillText(`${r.score} out of 75  ·  ${r.verdict.label}`, W / 2, y + 80);

    ctx.font = `24px ${BODY}`; ctx.fillStyle = SOFT;
    ctx.fillText('potatates.github.io/enneagram', W / 2, H - 56);

    return new Promise((resolve) => c.toBlob(resolve, 'image/png'));
  }

  E.share = { card };
})();
