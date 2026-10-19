import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1280, 769
canvas = Image.new('RGB', (W, H), '#080d17')
draw = ImageDraw.Draw(canvas)

# Background subtle ambient glow
glow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
glow_draw.ellipse([-120, -120, 600, 600], fill=(0, 217, 255, 30))
glow_draw.ellipse([700, 200, 1500, 950], fill=(163, 255, 18, 20))
glow = glow.filter(ImageFilter.GaussianBlur(80))
canvas.paste(glow, (0, 0), glow)

draw = ImageDraw.Draw(canvas)

font_path_bold = "C:/Windows/Fonts/segoeuib.ttf" if os.path.exists("C:/Windows/Fonts/segoeuib.ttf") else "C:/Windows/Fonts/arialbd.ttf"
font_path_reg = "C:/Windows/Fonts/segoeui.ttf" if os.path.exists("C:/Windows/Fonts/segoeui.ttf") else "C:/Windows/Fonts/arial.ttf"

font_pill = ImageFont.truetype(font_path_bold, 17)
font_title = ImageFont.truetype(font_path_bold, 48)
font_title_sub = ImageFont.truetype(font_path_bold, 28)
font_badge = ImageFont.truetype(font_path_bold, 20)
font_footer = ImageFont.truetype(font_path_bold, 18)
font_url = ImageFont.truetype(font_path_reg, 16)

# 1. Top Category Pill Tag
pill_box = [60, 50, 460, 90]
draw.rounded_rectangle(pill_box, radius=20, fill='#0a192f', outline='#00d9ff', width=2)
draw.ellipse([80, 63, 92, 75], fill='#00d9ff')
draw.text((105, 59), "TOP-TIER WEB DEVELOPMENT", font=font_pill, fill='#00d9ff')

# 2. Main Title (High Contrast)
draw.text((60, 112), "NEXT.JS & REACT", font=font_title, fill='#ffffff')
draw.text((60, 170), "WEB APPLICATIONS", font=font_title, fill='#a3ff12')
draw.text((60, 230), "Tailwind CSS • High Speed", font=font_title_sub, fill='#94a3b8')

# 3. Value Proposition Badges
bullets = [
    ("Blazingly Fast Speeds (95+ Lighthouse)", "#38bdf8"),
    ("100% Mobile & Tablet Responsive", "#a3ff12"),
    ("Figma to Pixel-Perfect Code", "#c084fc"),
    ("API & Database Integrations", "#fb923c"),
    ("Deployment to Vercel Included", "#4ade80")
]

y_pos = 295
for text, col in bullets:
    draw.rounded_rectangle([60, y_pos, 520, y_pos + 48], radius=10, fill='#0f172a', outline='#1e293b', width=1)
    draw.rounded_rectangle([60, y_pos, 66, y_pos + 48], radius=4, fill=col)
    draw.ellipse([85, y_pos + 15, 103, y_pos + 33], fill=col)
    draw.line([(90, y_pos + 24), (93, y_pos + 28), (99, y_pos + 20)], fill='#000000', width=2)
    draw.text((118, y_pos + 12), text, font=font_badge, fill='#f1f5f9')
    y_pos += 62

# 4. Right side: Browser Mockup
src = Image.open('public/showcase/portfolio_showcase.png')
# Crop strictly the top hero section
hero = src.crop((0, 0, 1456, 850))

mockup_w = 680
aspect = hero.size[1] / hero.size[0]
mockup_h = int(mockup_w * aspect)
hero_resized = hero.resize((mockup_w, mockup_h), Image.Resampling.LANCZOS)

header_h = 38
total_frame_h = mockup_h + header_h

frame = Image.new('RGBA', (mockup_w, total_frame_h), (0, 0, 0, 0))
frame_draw = ImageDraw.Draw(frame)

# Frame background
frame_draw.rounded_rectangle([0, 0, mockup_w - 1, total_frame_h - 1], radius=16, fill='#111827', outline='#38bdf8', width=2)
# Browser top bar
frame_draw.rounded_rectangle([2, 2, mockup_w - 3, header_h], radius=14, fill='#1e293b')
# Traffic dots
frame_draw.ellipse([16, 13, 27, 24], fill='#ef4444')
frame_draw.ellipse([35, 13, 46, 24], fill='#f59e0b')
frame_draw.ellipse([54, 13, 65, 24], fill='#10b981')
# URL bar mockup
frame_draw.rounded_rectangle([86, 7, mockup_w - 20, 31], radius=6, fill='#0f172a', outline='#334155', width=1)
frame_draw.ellipse([98, 14, 107, 23], fill='#10b981')
frame_draw.text((115, 10), "https://ahmad-portfolio.vercel.app", font=font_url, fill='#94a3b8')

# Paste screenshot inside frame
frame.paste(hero_resized, (0, header_h))
frame_draw.rounded_rectangle([0, 0, mockup_w - 1, total_frame_h - 1], radius=16, outline='#38bdf8', width=2)

# Paste frame onto canvas centered vertically
canvas.paste(frame.convert('RGB'), (555, 140))

# 5. Bottom Guarantee Banner
draw.rounded_rectangle([60, 675, 520, 722], radius=10, fill='#064e3b', outline='#10b981', width=1)
draw.ellipse([80, 691, 96, 707], fill='#10b981')
draw.text((108, 688), "Clean Code • 100% Satisfaction Guarantee", font=font_footer, fill='#6ee7b7')

output_path = 'public/showcase/fiverr_gig_cover.png'
canvas.save(output_path, 'PNG', quality=95)
print(f"Perfect gig image generated at {output_path}")
