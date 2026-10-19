import os
import shutil
import subprocess
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1280, 720
FPS = 30
TOTAL_SECONDS = 20
TOTAL_FRAMES = FPS * TOTAL_SECONDS # 600 frames

temp_dir = "public/showcase/video_frames"
if os.path.exists(temp_dir):
    shutil.rmtree(temp_dir)
os.makedirs(temp_dir, exist_ok=True)

font_bold = "C:/Windows/Fonts/segoeuib.ttf" if os.path.exists("C:/Windows/Fonts/segoeuib.ttf") else "C:/Windows/Fonts/arialbd.ttf"
font_reg = "C:/Windows/Fonts/segoeui.ttf" if os.path.exists("C:/Windows/Fonts/segoeui.ttf") else "C:/Windows/Fonts/arial.ttf"

f_large = ImageFont.truetype(font_bold, 52)
f_med = ImageFont.truetype(font_bold, 34)
f_sub = ImageFont.truetype(font_reg, 24)
f_pill = ImageFont.truetype(font_bold, 18)
f_badge = ImageFont.truetype(font_bold, 20)

src = Image.open('public/showcase/portfolio_showcase.png')
src_w, src_h = src.size

print("Rendering video frames...")

# We will render 4 phases:
# Phase 1: Intro (0-4s, frames 0-119)
# Phase 2: Live Platform Showcase Pan (4-10s, frames 120-299)
# Phase 3: Project Deep-Dive ShopLens & Flexivo (10-15s, frames 300-449)
# Phase 4: Call to action / Outro (15-20s, frames 450-599)

for f in range(TOTAL_FRAMES):
    t = f / FPS
    im = Image.new('RGB', (W, H), '#080d17')
    d = ImageDraw.Draw(im)

    if t < 4.0:
        # --- PHASE 1: INTRO ---
        progress = min(1.0, t / 1.5)
        # Background ambient glow
        glow_rad = int(300 + 40 * (t % 2))
        d.ellipse([W//2 - glow_rad, H//2 - glow_rad, W//2 + glow_rad, H//2 + glow_rad], fill='#0d1f38')
        
        # Pill Tag
        d.rounded_rectangle([W//2 - 200, 160, W//2 + 200, 205], radius=20, fill='#0a192f', outline='#00d9ff', width=2)
        d.text((W//2 - 165, 172), "FULL-STACK WEB DEVELOPER", font=f_pill, fill='#00d9ff')

        # Main Name
        d.text((W//2 - 230, 230), "AHMAD HASSAN", font=f_large, fill='#ffffff')
        
        # Subtitle
        d.text((W//2 - 275, 305), "Modern Next.js, React & TypeScript Web Apps", font=f_med, fill='#a3ff12')
        d.text((W//2 - 250, 365), "High-Speed Performance • Clean Code • Automation", font=f_sub, fill='#94a3b8')

        # Tech stack pill row
        pills = ["Next.js 16", "React 19", "Tailwind CSS", "TypeScript", "Python Automation"]
        start_x = W//2 - 380
        for p in pills:
            d.rounded_rectangle([start_x, 460, start_x + 140, 505], radius=10, fill='#0f172a', outline='#334155', width=1)
            d.text((start_x + 18, 472), p, font=f_pill, fill='#38bdf8')
            start_x += 155

    elif t < 10.0:
        # --- PHASE 2: PLATFORM PAN ---
        pan_t = (t - 4.0) / 6.0
        # Pan smoothly through the hero and dashboard
        # from y=0 to y=1000
        crop_y = int(pan_t * 900)
        crop_h = int(src_w * (H / W))
        section = src.crop((0, crop_y, src_w, min(src_h, crop_y + crop_h)))
        section_resized = section.resize((W, H), Image.Resampling.LANCZOS)
        im.paste(section_resized, (0, 0))

        # Semi-transparent overlay banner at top
        overlay = Image.new('RGBA', (W, 90), (8, 13, 23, 220))
        im.paste(overlay, (0, 0), overlay)
        d = ImageDraw.Draw(im)
        d.line([(0, 90), (W, 90)], fill='#00d9ff', width=2)
        d.text((40, 26), "LIVE DIGITAL WORKSPACE", font=f_med, fill='#ffffff')
        d.text((480, 32), "• Interactive Telemetry, Next.js Architecture & Dark UI", font=f_sub, fill='#a3ff12')

        # Bottom badge
        b_overlay = Image.new('RGBA', (460, 50), (15, 23, 42, 230))
        im.paste(b_overlay, (40, H - 70), b_overlay)
        d = ImageDraw.Draw(im)
        d.rounded_rectangle([40, H - 70, 500, H - 20], radius=8, outline='#38bdf8', width=1)
        d.text((55, H - 56), "⚡ 100% Mobile & Ultra-Wide Responsive", font=f_pill, fill='#38bdf8')

    elif t < 15.0:
        # --- PHASE 3: PRODUCTION CASE STUDIES (ShopLens & Automation) ---
        p_t = (t - 10.0) / 5.0
        # Projects section is roughly y=2200 to 3200
        proj_y = int(2200 + p_t * 500)
        crop_h = int(src_w * (H / W))
        section = src.crop((0, proj_y, src_w, min(src_h, proj_y + crop_h)))
        section_resized = section.resize((W, H), Image.Resampling.LANCZOS)
        im.paste(section_resized, (0, 0))

        # Top banner
        overlay = Image.new('RGBA', (W, 90), (8, 13, 23, 220))
        im.paste(overlay, (0, 0), overlay)
        d = ImageDraw.Draw(im)
        d.line([(0, 90), (W, 90)], fill='#a3ff12', width=2)
        d.text((40, 26), "PRODUCTION CASE STUDIES", font=f_med, fill='#ffffff')
        d.text((510, 32), "• ShopLens, Flexivo, WhatsApp Automation", font=f_sub, fill='#38bdf8')

        # Bottom badge
        b_overlay = Image.new('RGBA', (480, 50), (15, 23, 42, 230))
        im.paste(b_overlay, (40, H - 70), b_overlay)
        d = ImageDraw.Draw(im)
        d.rounded_rectangle([40, H - 70, 520, H - 20], radius=8, outline='#10b981', width=1)
        d.text((55, H - 56), "✓ Clean Code • Full Source Code & Deployment", font=f_pill, fill='#6ee7b7')

    else:
        # --- PHASE 4: CALL TO ACTION ---
        d.ellipse([W//2 - 350, H//2 - 350, W//2 + 350, H//2 + 350], fill='#0a233b')

        d.rounded_rectangle([W//2 - 220, 140, W//2 + 220, 185], radius=20, fill='#064e3b', outline='#10b981', width=2)
        d.text((W//2 - 180, 152), "100% SATISFACTION GUARANTEED", font=f_pill, fill='#6ee7b7')

        d.text((W//2 - 380, 220), "Ready to Launch Your Next Project?", font=f_large, fill='#ffffff')
        d.text((W//2 - 340, 300), "From Idea to Full Production Web Application", font=f_med, fill='#a3ff12')

        features = [
            "⚡ Fast Turnaround & Daily Updates",
            "📱 Pixel-Perfect Across All Screens",
            "🚀 Free Deployment to Vercel",
            "🛠️ Modern Next.js, React & Tailwind CSS"
        ]
        y_f = 370
        for feat in features:
            d.text((W//2 - 220, y_f), feat, font=f_sub, fill='#f1f5f9')
            y_f += 42

        # Order / Contact button mockup
        btn_box = [W//2 - 180, 560, W//2 + 180, 620]
        d.rounded_rectangle(btn_box, radius=12, fill='#16a34a')
        d.text((W//2 - 120, 576), "ORDER NOW ON FIVERR", font=f_badge, fill='#ffffff')

    frame_path = os.path.join(temp_dir, f"frame_{f:04d}.png")
    im.save(frame_path, 'PNG')

print(f"Rendered {TOTAL_FRAMES} frames. Now compiling MP4 video with FFmpeg...")

output_video = "public/showcase/fiverr_gig_video.mp4"
ffmpeg_cmd = [
    "ffmpeg", "-y",
    "-framerate", str(FPS),
    "-i", os.path.join(temp_dir, "frame_%04d.png"),
    "-c:v", "libx264",
    "-pix_fmt", "yuv420p",
    "-crf", "22",
    "-preset", "fast",
    output_video
]

subprocess.run(ffmpeg_cmd, check=True)
print(f"Video created successfully at {output_video}")

# Cleanup temp frames
shutil.rmtree(temp_dir)
print("Cleaned up temporary frames.")
