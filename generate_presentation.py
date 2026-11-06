import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5) # 16:9 widescreen layout

    # Color Palette (CineVerse Dark Cinema Theme)
    BG_COLOR = RGBColor(11, 15, 25)        # Deep slate/navy #0b0f19
    CARD_BG = RGBColor(22, 30, 49)          # Card container #161e31
    TEXT_MAIN = RGBColor(248, 250, 252)     # White #f8fafc
    TEXT_MUTED = RGBColor(148, 163, 184)    # Slate #94a3b8
    ACCENT_PURPLE = RGBColor(168, 85, 247)  # Violet #a855f7
    ACCENT_BLUE = RGBColor(99, 102, 241)    # Indigo #6366f1
    ACCENT_GOLD = RGBColor(245, 158, 11)    # Amber Star #f59e0b
    ACCENT_RED = RGBColor(239, 68, 68)      # Crimson #ef4444

    def add_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category="CINEVERSE MERN PROJECT"):
        # Category Tag
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11), Inches(0.4))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ACCENT_PURPLE

        # Slide Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.5), Inches(0.8))
        tf = title_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(28)
        p.font.bold = True
        p.font.color.rgb = TEXT_MAIN

    # ==========================================================
    # SLIDE 1: Title and Team Details
    # ==========================================================
    slide_layout = prs.slide_layouts[6] # Blank
    s1 = prs.slides.add_slide(slide_layout)
    add_slide_background(s1)

    # Accent decorative box
    banner = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.2), Inches(11.733), Inches(5.1))
    banner.fill.solid()
    banner.fill.fore_color.rgb = CARD_BG
    banner.line.color.rgb = ACCENT_BLUE

    # Title box
    tbox = s1.shapes.add_textbox(Inches(1.2), Inches(1.5), Inches(11), Inches(2.0))
    tf1 = tbox.text_frame
    p1 = tf1.paragraphs[0]
    p1.text = "CineVerse 🎬"
    p1.font.size = Pt(40)
    p1.font.bold = True
    p1.font.color.rgb = TEXT_MAIN

    p1_sub = tf1.add_paragraph()
    p1_sub.text = "Full-Stack Movie Discovery & Management Platform"
    p1_sub.font.size = Pt(22)
    p1_sub.font.bold = True
    p1_sub.font.color.rgb = ACCENT_BLUE

    p1_desc = tf1.add_paragraph()
    p1_desc.text = "MERN Stack Web Development Training Program Final Capstone Project"
    p1_desc.font.size = Pt(14)
    p1_desc.font.color.rgb = TEXT_MUTED

    # Team details table / cards
    team_box = s1.shapes.add_textbox(Inches(1.2), Inches(3.6), Inches(10.8), Inches(2.2))
    tf_team = team_box.text_frame

    pt = tf_team.paragraphs[0]
    pt.text = "👥 Team Details & Contribution:"
    pt.font.size = Pt(16)
    pt.font.bold = True
    pt.font.color.rgb = ACCENT_GOLD

    m1 = tf_team.add_paragraph()
    m1.text = "• Team Name: DevDynamos (Team #1)"
    m1.font.size = Pt(14)
    m1.font.color.rgb = TEXT_MAIN

    m2 = tf_team.add_paragraph()
    m2.text = "• Member 1: Samar (Lead Full-Stack Developer & Architect) | Reg No: 2024BCSE001"
    m2.font.size = Pt(13)
    m2.font.color.rgb = TEXT_MUTED

    m3 = tf_team.add_paragraph()
    m3.text = "• Member 2: Alex Rivera (Frontend UI/UX & React State Management) | Reg No: 2024BCSE002"
    m3.font.size = Pt(13)
    m3.font.color.rgb = TEXT_MUTED

    m4 = tf_team.add_paragraph()
    m4.text = "• Member 3: Priyansh Sharma (Backend REST API & Database Integration) | Reg No: 2024BCSE003"
    m4.font.size = Pt(13)
    m4.font.color.rgb = TEXT_MUTED

    # ==========================================================
    # SLIDE 2: Introduction & Problem Statement
    # ==========================================================
    s2 = prs.slides.add_slide(slide_layout)
    add_slide_background(s2)
    add_header(s2, "Introduction & Problem Statement", "02 / 10 | Background & Context")

    # Card Left: Problem Statement
    c_left = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    c_left.fill.solid()
    c_left.fill.fore_color.rgb = CARD_BG
    c_left.line.color.rgb = ACCENT_RED

    tb_left = s2.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.3))
    tf_l = tb_left.text_frame
    tf_l.word_wrap = True
    p_l1 = tf_l.paragraphs[0]
    p_l1.text = "⚠️ Problem Statement"
    p_l1.font.size = Pt(20)
    p_l1.font.bold = True
    p_l1.font.color.rgb = ACCENT_RED

    points_l = [
        "Digital content overload leaves film enthusiasts struggling to organize watchlists and discover movies across diverse genres.",
        "Legacy movie systems lack unified full-stack synchronization: client-side mock databases fail to support persistence, concurrency, and authorization.",
        "Scattered review forums fail to provide immediate, actionable rating metrics and real-time community engagement.",
        "Need for a robust, production-grade MERN architecture that scales seamlessly from local development to cloud deployment."
    ]
    for pt in points_l:
        p = tf_l.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(13)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(8)

    # Card Right: Solution
    c_right = s2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8))
    c_right.fill.solid()
    c_right.fill.fore_color.rgb = CARD_BG
    c_right.line.color.rgb = ACCENT_BLUE

    tb_right = s2.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.1), Inches(4.3))
    tf_r = tb_right.text_frame
    tf_r.word_wrap = True
    p_r1 = tf_r.paragraphs[0]
    p_r1.text = "✨ The CineVerse Solution"
    p_r1.font.size = Pt(20)
    p_r1.font.bold = True
    p_r1.font.color.rgb = ACCENT_BLUE

    points_r = [
        "Unified Full-Stack Application: Seamless communication between React frontend and Node/Express backend.",
        "Persistent MongoDB Data Layer: Schema-validated documents supporting relational virtuals for movies, reviews, and users.",
        "Real-Time Movie Discovery: Instant multi-attribute search, genre filtering, dynamic sorting, and watchlist favorites.",
        "Interactive Community Features: User authentication (JWT), 5-star rating reviews, and an analytics dashboard with real-time aggregations."
    ]
    for pt in points_r:
        p = tf_r.add_paragraph()
        p.text = f"• {pt}"
        p.font.size = Pt(13)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(8)

    # ==========================================================
    # SLIDE 3: Project Objectives
    # ==========================================================
    s3 = prs.slides.add_slide(slide_layout)
    add_slide_background(s3)
    add_header(s3, "Project Objectives & Scope", "03 / 10 | Goals & Milestones")

    objectives = [
        ("Full-Stack MERN Architecture", "Develop a production-grade web application strictly adhering to MongoDB, Express.js, React.js, and Node.js standards.", ACCENT_BLUE),
        ("Complete CRUD Implementation", "Provide full Create, Read, Update, and Delete operations for movies, genres, and community reviews with optimistic UI feedback.", ACCENT_PURPLE),
        ("Secure Authentication & RBAC", "Implement stateless JWT-based authentication with bcrypt password hashing and Role-Based Access Control (Admin vs. Standard User).", ACCENT_GOLD),
        ("Responsive & Modern UI/UX", "Deliver a dark cinema aesthetic featuring responsive grid cards, modal dialogs, toast notifications, and interactive analytics.", ACCENT_RED),
        ("Zero-Config Resilience", "Support automated database seeding, MongoDB Atlas cloud connectivity, and graceful in-memory fallbacks.", ACCENT_BLUE),
        ("Deployment & DevOps Readiness", "Package application for automated builds on Render, Vercel, and Docker with comprehensive documentation.", ACCENT_PURPLE)
    ]

    for i, (title, desc, color) in enumerate(objectives):
        col = i % 3
        row = i // 3
        left = Inches(0.8 + col * 3.95)
        top = Inches(1.8 + row * 2.5)

        card = s3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(3.75), Inches(2.2))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = color

        tb = s3.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(3.35), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p_t = tf.paragraphs[0]
        p_t.text = f"{i+1}. {title}"
        p_t.font.size = Pt(15)
        p_t.font.bold = True
        p_t.font.color.rgb = color

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = TEXT_MUTED

    # ==========================================================
    # SLIDE 4: Technologies & Tools Used (MERN Stack)
    # ==========================================================
    s4 = prs.slides.add_slide(slide_layout)
    add_slide_background(s4)
    add_header(s4, "Technologies & Tools (MERN Stack)", "04 / 10 | Technology Stack")

    tech_cards = [
        ("MongoDB & Mongoose", "Database Layer", [
            "NoSQL document database for flexible movie schemas",
            "Mongoose ODM with schema validations & virtual populate",
            "Aggregation pipelines for real-time dashboard analytics",
            "Indexed fields for high-performance title & genre queries"
        ], ACCENT_GOLD),
        ("Express.js & Node.js", "Backend REST API", [
            "Node.js v24 runtime with asynchronous event loop",
            "Express.js modular router with clean MVC architecture",
            "JSON Web Token (JWT) & bcrypt for secure auth",
            "Centralized error handling & CORS configuration"
        ], ACCENT_BLUE),
        ("React.js & Vite", "Frontend Client", [
            "React 18 Single Page Application (SPA)",
            "Vite 5 for instantaneous HMR & optimized production bundling",
            "React Router v6 for declarative client-side routing",
            "Custom context hooks for Auth & Toast notifications"
        ], ACCENT_PURPLE),
        ("DevOps & Utilities", "Tooling & Deployment", [
            "Axios with HTTP interceptors for automatic Bearer tokens",
            "Lucide React for sleek, scalable SVG cinema icons",
            "Git & GitHub for collaborative version control",
            "Render & Vercel cloud platforms for public deployment"
        ], ACCENT_RED),
    ]

    for i, (title, subtitle, bullets, color) in enumerate(tech_cards):
        left = Inches(0.8 + i * 2.95)
        card = s4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, Inches(1.8), Inches(2.8), Inches(4.8))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = color

        tb = s4.shapes.add_textbox(left + Inches(0.2), Inches(2.0), Inches(2.4), Inches(4.3))
        tf = tb.text_frame
        tf.word_wrap = True

        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(16)
        p_t.font.bold = True
        p_t.font.color.rgb = color

        p_s = tf.add_paragraph()
        p_s.text = subtitle.upper()
        p_s.font.size = Pt(10)
        p_s.font.bold = True
        p_s.font.color.rgb = TEXT_MAIN
        p_s.space_after = Pt(12)

        for b in bullets:
            p_b = tf.add_paragraph()
            p_b.text = f"• {b}"
            p_b.font.size = Pt(10)
            p_b.font.color.rgb = TEXT_MUTED
            p_b.space_after = Pt(6)

    # ==========================================================
    # SLIDE 5: System Architecture & Workflow
    # ==========================================================
    s5 = prs.slides.add_slide(slide_layout)
    add_slide_background(s5)
    add_header(s5, "System Architecture & Workflow", "05 / 10 | Architectural Design")

    # Flowchart layers
    layers = [
        ("1. Presentation Tier (Client)", "React.js + Vite (Port 5173)\n• Component Hierarchy (Navbar, Catalog, Details, Dashboard, Modals)\n• React Router v6 & Client Contexts (AuthContext, ToastContext)\n• Axios Interceptor transmitting Bearer JWT Tokens", ACCENT_PURPLE, Inches(1.8)),
        ("2. API & Routing Tier (Controller / Middleware)", "Express.js + Node.js (Port 5000)\n• Global CORS, JSON parser, Morgan logger, and Centralized Error Middleware\n• Auth Middleware (JWT Token Verification & Role Verification)\n• Resource Routes (/api/movies, /api/auth, /api/reviews, /api/stats)", ACCENT_BLUE, Inches(3.4)),
        ("3. Persistence Tier (Data / Cloud)", "MongoDB & Mongoose ODM\n• Movie Collection (Catalogs, metadata, favourites, director, duration)\n• Review Collection (Indexed compound keys, 1-5 star ratings)\n• User Collection (Bcrypt hashed credentials, role designations)\n• Aggregation Engine for Real-Time Analytics", ACCENT_GOLD, Inches(5.0))
    ]

    for title, desc, color, top in layers:
        card = s5.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), top, Inches(11.733), Inches(1.35))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = color

        tb = s5.shapes.add_textbox(Inches(1.1), top + Inches(0.12), Inches(11.1), Inches(1.1))
        tf = tb.text_frame
        tf.word_wrap = True

        pt = tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(15)
        pt.font.bold = True
        pt.font.color.rgb = color

        pd = tf.add_paragraph()
        pd.text = desc
        pd.font.size = Pt(11)
        pd.font.color.rgb = TEXT_MUTED

    # ==========================================================
    # SLIDE 6: Features & Functionalities
    # ==========================================================
    s6 = prs.slides.add_slide(slide_layout)
    add_slide_background(s6)
    add_header(s6, "Features & Functionalities", "06 / 10 | Application Capabilities")

    features = [
        ("🎬 Full Movie Catalog & CRUD", "Create, Read, Update, and Delete movies with modal form inputs, genre selection, release year, rating, and poster preview."),
        ("🔍 Real-Time Search & Filtering", "Dynamic multi-attribute search across title, genre, and synopsis with zero lag, plus genre filters and sorting options."),
        ("❤️ Interactive Favourites / Watchlist", "One-click heart toggle on cards and details view with optimistic UI updates and instant database synchronization."),
        ("⭐ Community Reviews & Ratings", "Audience review system with 1-5 star ratings, feedback commentary, timestamp logging, and author deletion rights."),
        ("📊 Analytics Dashboard", "Visual breakdown of catalog metrics: total movies, average rating, genre distributions, language breakdown, and top-rated leaderboard."),
        ("🔐 Secure User Authentication", "JWT stateless token auth, bcrypt password hashing, login/register forms with built-in demo credentials autofill.")
    ]

    for i, (f_title, f_desc) in enumerate(features):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.8 + row * 1.65)

        card = s6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.75), Inches(1.45))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = ACCENT_BLUE

        tb = s6.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), Inches(5.35), Inches(1.2))
        tf = tb.text_frame
        tf.word_wrap = True

        pt = tf.paragraphs[0]
        pt.text = f_title
        pt.font.size = Pt(14)
        pt.font.bold = True
        pt.font.color.rgb = TEXT_MAIN

        pd = tf.add_paragraph()
        pd.text = f_desc
        pd.font.size = Pt(11)
        pd.font.color.rgb = TEXT_MUTED

    # ==========================================================
    # SLIDE 7: Database Design & API Integration
    # ==========================================================
    s7 = prs.slides.add_slide(slide_layout)
    add_slide_background(s7)
    add_header(s7, "Database Design & REST API Integration", "07 / 10 | Data Architecture")

    # Left: Database Schema
    c_s7_left = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    c_s7_left.fill.solid()
    c_s7_left.fill.fore_color.rgb = CARD_BG
    c_s7_left.line.color.rgb = ACCENT_GOLD

    tb_s7_l = s7.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.3))
    tf_s7_l = tb_s7_l.text_frame
    tf_s7_l.word_wrap = True

    p = tf_s7_l.paragraphs[0]
    p.text = "🗄️ MongoDB Collections & Schema"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GOLD

    schemas = [
        "Movie Schema: title (String*), genre (String*), releaseYear (Number*), rating (Number 0-10), duration (Number), poster (URL), description (String), isFavourite (Boolean), createdBy (Ref User).",
        "User Schema: name (String*), email (Unique, lowercase*), password (Bcrypt hashed*), role (user | admin), timestamps.",
        "Review Schema: movie (Ref Movie*), user (Ref User*), userName (String), rating (Number 1-5), comment (String), compound index on (movie, user)."
    ]
    for s in schemas:
        ps = tf_s7_l.add_paragraph()
        ps.text = f"• {s}"
        ps.font.size = Pt(11)
        ps.font.color.rgb = TEXT_MUTED
        ps.space_after = Pt(8)

    # Right: REST API Endpoints
    c_s7_right = s7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8))
    c_s7_right.fill.solid()
    c_s7_right.fill.fore_color.rgb = CARD_BG
    c_s7_right.line.color.rgb = ACCENT_PURPLE

    tb_s7_r = s7.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.1), Inches(4.3))
    tf_s7_r = tb_s7_r.text_frame
    tf_s7_r.word_wrap = True

    p = tf_s7_r.paragraphs[0]
    p.text = "🌐 REST API Endpoints"
    p.font.size = Pt(17)
    p.font.bold = True
    p.font.color.rgb = ACCENT_PURPLE

    endpoints = [
        "GET /api/movies - List movies (Search, Genre, Favourites, Sort)",
        "GET /api/movies/:id - Get movie details + populated reviews",
        "POST /api/movies - Create new movie (Protected / Auth)",
        "PUT /api/movies/:id - Update existing movie",
        "DELETE /api/movies/:id - Delete movie & cascade delete reviews",
        "PATCH /api/movies/:id/favourite - Toggle favourite heart status",
        "POST /api/movies/:id/reviews - Submit 5-star review & comment",
        "GET /api/stats - Aggregate dashboard analytics (counts, distributions)",
        "POST /api/auth/register & login - User signup and JWT issuance"
    ]
    for ep in endpoints:
        pe = tf_s7_r.add_paragraph()
        pe.text = f"• {ep}"
        pe.font.size = Pt(11)
        pe.font.color.rgb = TEXT_MUTED
        pe.space_after = Pt(4)

    # ==========================================================
    # SLIDE 8: Screenshots & UI Walkthrough
    # ==========================================================
    s8 = prs.slides.add_slide(slide_layout)
    add_slide_background(s8)
    add_header(s8, "Screenshots & Application UI Walkthrough", "08 / 10 | User Interface")

    ui_views = [
        ("Home Movie Catalog", "Dark-themed cinema grid showcasing movie posters, IMDb ratings, genre tags, quick favourite toggles, real-time live search, and sorting controls."),
        ("Movie Details & Reviews", "Cinematic hero banner displaying high-res poster, synopsis, director metadata, edit/delete actions, and dynamic audience review submission form."),
        ("Add & Edit Modal Dialog", "Clean modal overlay with comprehensive form fields, input validation alerts, real-time poster URL preview, and duration calculation."),
        ("Analytics & Metrics Dashboard", "Interactive visual statistics displaying catalog volume, average ratings, genre distribution percentage bars, and top-rated leaderboard.")
    ]

    for i, (v_title, v_desc) in enumerate(ui_views):
        col = i % 2
        row = i // 2
        left = Inches(0.8 + col * 5.95)
        top = Inches(1.8 + row * 2.5)

        card = s8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(5.75), Inches(2.2))
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = ACCENT_BLUE

        tb = s8.shapes.add_textbox(left + Inches(0.2), top + Inches(0.2), Inches(5.35), Inches(1.8))
        tf = tb.text_frame
        tf.word_wrap = True

        pt = tf.paragraphs[0]
        pt.text = f"🖥️ {v_title}"
        pt.font.size = Pt(16)
        pt.font.bold = True
        pt.font.color.rgb = ACCENT_BLUE

        pd = tf.add_paragraph()
        pd.text = v_desc
        pd.font.size = Pt(12)
        pd.font.color.rgb = TEXT_MUTED

    # ==========================================================
    # SLIDE 9: Challenges Faced & Future Scope
    # ==========================================================
    s9 = prs.slides.add_slide(slide_layout)
    add_slide_background(s9)
    add_header(s9, "Challenges Faced & Future Scope", "09 / 10 | Reflection & Roadmap")

    # Left: Challenges & Solutions
    c_s9_l = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    c_s9_l.fill.solid()
    c_s9_l.fill.fore_color.rgb = CARD_BG
    c_s9_l.line.color.rgb = ACCENT_RED

    tb_s9_l = s9.shapes.add_textbox(Inches(1.1), Inches(2.0), Inches(5.0), Inches(4.3))
    tf_s9_l = tb_s9_l.text_frame
    tf_s9_l.word_wrap = True

    p = tf_s9_l.paragraphs[0]
    p.text = "⚡ Key Challenges & Solutions"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = ACCENT_RED

    challenges = [
        ("Asynchronous State & Optimistic UI", "Challenge: Lag when liking movies.\nSolution: Implemented optimistic client state updates with rollback on API failure."),
        ("Database Portability", "Challenge: Lack of local MongoDB daemon on developer machines.\nSolution: Configured in-memory Mongo fallback with automatic database seeding."),
        ("Virtual Relations & Cascade Deletion", "Challenge: Orphaned reviews upon deleting movies.\nSolution: Added Mongoose middleware to clean up related reviews automatically.")
    ]
    for c_title, c_sol in challenges:
        pc = tf_s9_l.add_paragraph()
        pc.text = f"• {c_title}"
        pc.font.size = Pt(12)
        pc.font.bold = True
        pc.font.color.rgb = TEXT_MAIN
        ps = tf_s9_l.add_paragraph()
        ps.text = f"  {c_sol}"
        ps.font.size = Pt(11)
        ps.font.color.rgb = TEXT_MUTED
        ps.space_after = Pt(6)

    # Right: Future Scope
    c_s9_r = s9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8))
    c_s9_r.fill.solid()
    c_s9_r.fill.fore_color.rgb = CARD_BG
    c_s9_r.line.color.rgb = ACCENT_PURPLE

    tb_s9_r = s9.shapes.add_textbox(Inches(7.1), Inches(2.0), Inches(5.1), Inches(4.3))
    tf_s9_r = tb_s9_r.text_frame
    tf_s9_r.word_wrap = True

    p = tf_s9_r.paragraphs[0]
    p.text = "🚀 Future Enhancements"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = ACCENT_PURPLE

    future_items = [
        "AI Recommendation Engine: Integration with Gemini API to offer personalized movie suggestions based on watch history.",
        "External TMDB / IMDb API Sync: Live ingestion of upcoming trailers, cast filmographies, and box-office statistics.",
        "Social Watch Parties: Real-time chat & synchronized video playback using Socket.io.",
        "Cloud Storage for Posters: Direct image upload to AWS S3 / Cloudinary rather than external URLs."
    ]
    for fi in future_items:
        pf = tf_s9_r.add_paragraph()
        pf.text = f"• {fi}"
        pf.font.size = Pt(12)
        pf.font.color.rgb = TEXT_MUTED
        pf.space_after = Pt(10)

    # ==========================================================
    # SLIDE 10: Conclusion
    # ==========================================================
    s10 = prs.slides.add_slide(slide_layout)
    add_slide_background(s10)
    add_header(s10, "Conclusion & Project Summary", "10 / 10 | Final Summary")

    c_concl = s10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.733), Inches(4.8))
    c_concl.fill.solid()
    c_concl.fill.fore_color.rgb = CARD_BG
    c_concl.line.color.rgb = ACCENT_GOLD

    tb_concl = s10.shapes.add_textbox(Inches(1.2), Inches(2.1), Inches(11.0), Inches(4.2))
    tf_c = tb_concl.text_frame
    tf_c.word_wrap = True

    p = tf_c.paragraphs[0]
    p.text = "🎯 Summary of Accomplishments"
    p.font.size = Pt(22)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GOLD
    p.space_after = Pt(14)

    concl_points = [
        "Successfully transformed the initial prototype into an enterprise-grade, fully functional MERN stack web application.",
        "Delivered end-to-end integration across MongoDB, Express.js, React.js, and Node.js with complete CRUD capabilities.",
        "Enhanced user experience with dark cinema aesthetics, real-time filtering, responsive cards, toast notifications, and analytics.",
        "Implemented secure JWT authentication, user reviews, role authorization, and robust error-handling middleware.",
        "All requirements of the MERN Stack Training Program—including source code, documentation, presentation, and deployment readiness—have been fulfilled."
    ]

    for pt in concl_points:
        pc = tf_c.add_paragraph()
        pc.text = f"✅ {pt}"
        pc.font.size = Pt(13)
        pc.font.color.rgb = TEXT_MAIN
        pc.space_after = Pt(8)

    thank_p = tf_c.add_paragraph()
    thank_p.text = "\nThank you! Questions and feedback are welcome."
    thank_p.font.size = Pt(15)
    thank_p.font.bold = True
    thank_p.font.color.rgb = ACCENT_BLUE

    # Ensure presentation directory exists
    os.makedirs('presentation', exist_ok=True)
    out_path = os.path.join('presentation', 'CineVerse_MERN_Project_Presentation.pptx')
    prs.save(out_path)
    print(f"Presentation saved successfully to: {out_path}")

if __name__ == '__main__':
    create_presentation()
