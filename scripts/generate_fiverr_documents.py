import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.pdfgen import canvas

# Document 1: Ahmad_Hassan_Technical_Resume.pdf
doc1_path = "public/showcase/Ahmad_Hassan_Technical_Resume.pdf"
doc1 = SimpleDocTemplate(
    doc1_path,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=36,
    bottomMargin=36
)

styles = getSampleStyleSheet()

# Custom styles
primary_color = colors.HexColor("#0f172a") # Slate 900
accent_color = colors.HexColor("#0284c7")  # Sky 600
text_dark = colors.HexColor("#1e293b")
text_muted = colors.HexColor("#64748b")

title_style = ParagraphStyle(
    'NameTitle',
    parent=styles['Heading1'],
    fontName='Helvetica-Bold',
    fontSize=22,
    leading=26,
    textColor=primary_color
)

subtitle_style = ParagraphStyle(
    'SubTitle',
    parent=styles['Normal'],
    fontName='Helvetica-Bold',
    fontSize=11,
    leading=15,
    textColor=accent_color
)

contact_style = ParagraphStyle(
    'Contact',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=text_muted
)

heading_style = ParagraphStyle(
    'SectionHeading',
    parent=styles['Heading2'],
    fontName='Helvetica-Bold',
    fontSize=12,
    leading=16,
    textColor=primary_color,
    spaceAfter=4
)

body_style = ParagraphStyle(
    'Body',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9.5,
    leading=13.5,
    textColor=text_dark
)

bullet_style = ParagraphStyle(
    'Bullet',
    parent=styles['Normal'],
    fontName='Helvetica',
    fontSize=9,
    leading=13,
    textColor=text_dark,
    leftIndent=12
)

elements1 = []

# Header
elements1.append(Paragraph("AHMAD HASSAN", title_style))
elements1.append(Paragraph("Full-Stack Web Developer & Automation Specialist | Next.js, React, Python", subtitle_style))
elements1.append(Spacer(1, 4))
elements1.append(Paragraph("Email: ahmad.hassan.dev@gmail.com  |  GitHub: github.com/Ahmad-Haassan  |  Worldwide Remote", contact_style))
elements1.append(Spacer(1, 8))
elements1.append(HRFlowable(width="100%", thickness=1.5, color=accent_color, spaceBefore=0, spaceAfter=8))

# Summary
elements1.append(Paragraph("PROFESSIONAL SUMMARY", heading_style))
elements1.append(Paragraph(
    "High-performing Computer Science developer focused on engineering fast, scalable web applications with Next.js (App Router), React 19, TypeScript, and Tailwind CSS. Experienced in building automated data workflows, API integrations, and Python scraping bots that save businesses hours of manual operation. Proven track record of delivering clean, maintainable architecture with 95+ Google Lighthouse speed scores.",
    body_style
))
elements1.append(Spacer(1, 10))

# Core Technical Competencies
elements1.append(Paragraph("CORE TECHNICAL COMPETENCIES", heading_style))
skills_data = [
    [Paragraph("<b>Frontend Frameworks:</b>", body_style), Paragraph("Next.js 15/16, React 19, TypeScript, JavaScript (ES6+), HTML5, CSS3", body_style)],
    [Paragraph("<b>Styling & UI:</b>", body_style), Paragraph("Tailwind CSS v4, Motion (Framer Motion), Responsive Design, Dark Mode UI", body_style)],
    [Paragraph("<b>Backend & Automation:</b>", body_style), Paragraph("Node.js, Express, Python (Web Scraping, Automation Scripts), REST APIs", body_style)],
    [Paragraph("<b>Databases & DevOps:</b>", body_style), Paragraph("Supabase, Firebase, Git, GitHub Actions, Vercel Deployment, Linux", body_style)],
]
t_skills = Table(skills_data, colWidths=[140, 400])
t_skills.setStyle(TableStyle([
    ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ('TOPPADDING', (0,0), (-1,-1), 2),
]))
elements1.append(t_skills)
elements1.append(Spacer(1, 10))

# Featured Projects & Deliverables
elements1.append(Paragraph("FEATURED PROJECTS & CLIENT DELIVERABLES", heading_style))

# Project 1: ShopLens
elements1.append(Paragraph("<b>ShopLens — E-Commerce Research & Price Comparison Engine</b>", body_style))
elements1.append(Paragraph("<i>Next.js, TypeScript, Python Web Scraper, Tailwind CSS</i>", contact_style))
elements1.append(Paragraph("• Architected a centralized product intelligence dashboard normalizing pricing data across major online retailers.", bullet_style))
elements1.append(Paragraph("• Implemented automated web data extraction scripts and sentiment analysis for customer reviews.", bullet_style))
elements1.append(Paragraph("• Achieved instantaneous search filtering and responsive cross-device layout with near-zero latency.", bullet_style))
elements1.append(Spacer(1, 6))

# Project 2: Modern Developer Platform
elements1.append(Paragraph("<b>High-Performance Developer Digital Command Center</b>", body_style))
elements1.append(Paragraph("<i>Next.js 16 (Turbopack), React 19, TypeScript, Framer Motion, Vercel</i>", contact_style))
elements1.append(Paragraph("• Built an interactive cyberpunk-themed developer showcase featuring command palette (Cmd+K) and real telemetry.", bullet_style))
elements1.append(Paragraph("• Maintained 100% responsive design with sub-second page loads and modular component architecture.", bullet_style))
elements1.append(Spacer(1, 6))

# Project 3: WhatsApp Business Automation
elements1.append(Paragraph("<b>WhatsApp Business Automation & Webhook Dispatcher</b>", body_style))
elements1.append(Paragraph("<i>Python, Node.js, Webhooks, RESTful APIs</i>", contact_style))
elements1.append(Paragraph("• Designed an automated webhook receiver routing incoming inquiries to specialized conversational workflows.", bullet_style))
elements1.append(Paragraph("• Reduced manual inquiry processing times with automated replies and business rule dispatching.", bullet_style))
elements1.append(Spacer(1, 10))

# Education
elements1.append(Paragraph("EDUCATION & FOUNDATIONS", heading_style))
elements1.append(Paragraph("<b>Bachelor of Science in Computer Science (BSCS)</b> — Undergraduate", body_style))
elements1.append(Paragraph("Core Focus: Data Structures & Algorithms, Object-Oriented Software Design, Operating Systems, Computer Networks.", contact_style))

doc1.build(elements1)
print(f"Resume generated at {doc1_path}")


# -------------------------------------------------------------
# Document 2: Ahmad_Hassan_FullStack_Case_Studies.pdf
doc2_path = "public/showcase/Ahmad_Hassan_FullStack_Case_Studies.pdf"
doc2 = SimpleDocTemplate(
    doc2_path,
    pagesize=letter,
    leftMargin=36,
    rightMargin=36,
    topMargin=36,
    bottomMargin=36
)

elements2 = []

# Title
elements2.append(Paragraph("AHMAD HASSAN — FULL-STACK CASE STUDIES", title_style))
elements2.append(Paragraph("Technical Overview, System Architecture & Client Solutions", subtitle_style))
elements2.append(Spacer(1, 4))
elements2.append(Paragraph("Portfolio Showcase Document | Contact: ahmad.hassan.dev@gmail.com | github.com/Ahmad-Haassan", contact_style))
elements2.append(Spacer(1, 8))
elements2.append(HRFlowable(width="100%", thickness=1.5, color=accent_color, spaceBefore=0, spaceAfter=8))

# Intro
elements2.append(Paragraph("CASE STUDY 1: ShopLens (E-Commerce Intelligence Platform)", heading_style))
elements2.append(Paragraph(
    "<b>Problem Statement:</b> Online shoppers waste significant time cross-referencing prices, delivery fees, and genuine reviews across multiple e-commerce stores with inconsistent formats.<br/>"
    "<b>Proposed Solution:</b> A unified web platform where users input product links to receive normalized price comparisons, standardized feature specifications, and synthesized customer review summaries.<br/>"
    "<b>Architecture & Stack:</b> Next.js 16 App Router on frontend, Python data extraction workers, structured JSON schemas, and Tailwind CSS for rapid responsive rendering.<br/>"
    "<b>Key Outcomes:</b> Normalized disparate product attributes into clean UI comparison tables; delivered sub-100ms client-side filtering.",
    body_style
))
elements2.append(Spacer(1, 12))

elements2.append(Paragraph("CASE STUDY 2: Flexivo (Desktop Assistant & Workflow Automation)", heading_style))
elements2.append(Paragraph(
    "<b>Problem Statement:</b> Repetitive system actions, hotkeys, and app switching create context friction for daily knowledge workers.<br/>"
    "<b>Proposed Solution:</b> An experimental desktop assistant built with speech recognition pipelines, system hotkey listeners, and automated task execution.<br/>"
    "<b>Architecture & Stack:</b> Python, PyQt / Desktop UI, Speech Recognition APIs, OS Automation hooks.<br/>"
    "<b>Key Outcomes:</b> Enabled hands-free system command routing and routine task execution with minimal CPU overhead.",
    body_style
))
elements2.append(Spacer(1, 12))

elements2.append(Paragraph("CASE STUDY 3: Enterprise Webhook & WhatsApp Routing System", heading_style))
elements2.append(Paragraph(
    "<b>Problem Statement:</b> Small businesses struggle to respond promptly to lead inquiries outside standard business hours, causing lost conversion opportunities.<br/>"
    "<b>Proposed Solution:</b> An automated messaging relay connecting WhatsApp Business Webhooks to structured routing logic and auto-responders.<br/>"
    "<b>Architecture & Stack:</b> Node.js, Express webhook listener, JSON Schema validation, REST API dispatchers.<br/>"
    "<b>Key Outcomes:</b> 100% automated first-touch response time; verified webhook signatures preventing unauthorized access.",
    body_style
))
elements2.append(Spacer(1, 14))

# Standards & Guarantee
elements2.append(Paragraph("ENGINEERING STANDARDS & GUARANTEE", heading_style))
elements2.append(Paragraph(
    "• <b>Clean, Documented Code:</b> Every project is delivered with modular code, comprehensive README setup instructions, and clean Git history.<br/>"
    "• <b>Performance-First:</b> 90+ score guarantee on Google Lighthouse for SEO, Accessibility, and Core Web Vitals.<br/>"
    "• <b>Cross-Platform Assurance:</b> Tested rigorously across Chrome, Safari, Firefox, Edge, and iOS/Android mobile viewports.<br/>"
    "• <b>Free Post-Delivery Bug Support:</b> Ensuring your deployment stays smooth and trouble-free.",
    body_style
))

doc2.build(elements2)
print(f"Case studies generated at {doc2_path}")
