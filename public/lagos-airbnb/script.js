// ==========================================
// Lagos Luxury Stays - JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const navbar = document.getElementById("navbar");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navLinks = document.getElementById("navLinks");
  const navLinkItems = document.querySelectorAll(".nav-link");
  const propertyModal = document.getElementById("propertyModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");
  const modalBody = document.getElementById("modalBody");
  const quickViewButtons = document.querySelectorAll(".quick-view-btn");
  const lifestyleTrack = document.getElementById("lifestyleTrack");
  const lifestylePrev = document.getElementById("lifestylePrev");
  const lifestyleNext = document.getElementById("lifestyleNext");
  const lifestyleDots = document.getElementById("lifestyleDots");
  const contactForm = document.getElementById("contactForm");

  // ==========================================
  // Navbar Scroll Effect
  // ==========================================
  const bookBtn = document.querySelector(".primary-btn");
  const manageBtn = document.querySelector(".secondary-btn");

  bookBtn.addEventListener("click", () => {
    document.querySelector("#properties").scrollIntoView({
      behavior: "smooth",
    });
  });

  manageBtn.addEventListener("click", () => {
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    });
  });

  // ==========================================
  // Mobile Navigation Toggle
  // ==========================================
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close mobile menu when clicking nav links
  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuToggle.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ==========================================
  // Active Nav Link on Scroll (viewport-center logic)
  // ==========================================
  const navbarEl = document.getElementById("navbar");

  function getNavbarHeight() {
    return navbarEl ? navbarEl.offsetHeight : 0;
  }

  const allNavLinks = [
    ...document.querySelectorAll(".nav-link"),
    ...document.querySelectorAll('.cta-btn[href="#contact"]'),
  ];

  const sections = Array.from(document.querySelectorAll("[id]")).filter(
    (s) =>
      !!document.querySelector(`.nav-link[href="#${s.id}"]`) ||
      s.id === "contact"
  );

  const contactCta = document.querySelector('.cta-btn.mobile[href="#contact"]');
  const contactSpan = contactCta ? contactCta.querySelector("span") : null;

  function highlightNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const viewportCenter = scrollY + window.innerHeight / 2;

    allNavLinks.forEach((link) => link.classList.remove("active"));
    if (contactSpan) contactSpan.style.color = "#fff";

    let matched = false;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (viewportCenter >= top && viewportCenter < bottom) {
        const link =
          document.querySelector(`.nav-link[href="#${section.id}"]`) ||
          document.querySelector(`.cta-btn[href="#${section.id}"]`);

        if (link) {
          link.classList.add("active");
          if (section.id === "contact" && contactSpan) {
            contactSpan.style.color = "var(--accent)";
          }
          matched = true;
        }
      }
    });

    if (!matched) {
      const atBottom =
        scrollY + window.innerHeight >= document.body.scrollHeight - 5;

      if (atBottom && sections.length) {
        const last = sections[sections.length - 1];
        const link =
          document.querySelector(`.nav-link[href="#${last.id}"]`) ||
          document.querySelector(`.cta-btn[href="#${last.id}"]`);

        if (link) {
          link.classList.add("active");
          if (last.id === "contact" && contactSpan) {
            contactSpan.style.color = "var(--accent)";
          }
        }
      }
    }
  }

  window.addEventListener("load", highlightNavLink);
  window.addEventListener("scroll", highlightNavLink);
  window.addEventListener("resize", highlightNavLink);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#" || this.classList.contains("quick-view-btn")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      if (target.id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const offset = target.offsetTop - getNavbarHeight();
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    });
  });

  // ==========================================
  // Property Carousel Handler (hover & parallax)
  // ==========================================
  const carouselCards = document.querySelectorAll(".property-card");
  const carouselGrid = document.querySelector(".properties-carousel");
  const btnLeft = document.querySelector(".properties-btn.left");
  const btnRight = document.querySelector(".properties-btn.right");

  // Smooth hover transitions
  const cardContainers = document.querySelectorAll(".property-card-container");
  cardContainers.forEach((container) => {
    container.style.transition = "transform 0.35s ease, box-shadow 0.35s ease";
  });

  // Scroll Reveal
  const scrollEffectsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        } else {
          entry.target.classList.remove("in-view");
        }
      });
    },
    { root: carouselGrid, threshold: 0.5 }
  );
  carouselCards.forEach((card) => scrollEffectsObserver.observe(card));

  // Image Parallax & Shadow Hover
  carouselCards.forEach((card) => {
    const img = card.querySelector(".property-image img");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const offsetX = ((x - rect.width / 2) / rect.width) * 10;
      const offsetY = ((y - rect.height / 2) / rect.height) * 10;

      img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.05)`;
      img.style.transition = "transform 0.2s ease-out";

      card.style.zIndex = 10;
    });

    card.addEventListener("mouseleave", () => {
      img.style.transform = "translate(0,0) scale(1)";
      img.style.transition = "transform 0.4s ease";
      card.style.boxShadow = "var(--shadow-md)";
      card.style.zIndex = 1;
    });
  });

  // Floating Animation
  carouselCards.forEach((card, i) => {
    card.style.animation = `float 4s ease-in-out infinite`;
    card.style.animationDelay = `${i * 0.2}s`;
  });

  // Carousel Buttons Scroll
  const scrollAmount = 480;

  btnLeft.addEventListener("click", () => {
    carouselGrid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    carouselGrid.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  // ==========================================
  // Property Data
  // ==========================================
  const propertyData = {
    1: {
      title: "Modern Skyline Penthouse",
      location: "Lekki Phase 1",
      price: "₦85,000",
      image: "/assets/images/homes/home1.jpg",
      description:
        "Experience luxury living at its finest in this stunning 3-bedroom penthouse featuring floor-to-ceiling windows with panoramic city views, contemporary Nigerian interior design, marble floors, and designer furniture. Located in the heart of Lekki Phase 1, this property offers the perfect blend of comfort and sophistication.",
      features: [
        { icon: "🛏️", label: "3 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🏊", label: "Swimming Pool" },
        { icon: "💪", label: "Gym Access" },
        { icon: "📶", label: "High-Speed WiFi" },
        { icon: "❄️", label: "Air Conditioning" },
        { icon: "🅿️", label: "Private Parking" },
        { icon: "🔒", label: "24/7 Security" },
      ],
    },
    2: {
      title: "Oceanview Luxury Suite",
      location: "Victoria Island",
      price: "₦120,000",
      image: "/assets/images/homes/home2.jpg",
      description:
        "Indulge in waterfront luxury with this elegant 2-bedroom apartment offering breathtaking ocean views from your private balcony. Featuring modern minimalist interior, premium finishes, and contemporary African art throughout. Perfect for both business travelers and leisure guests seeking an upscale Victoria Island experience.",
      features: [
        { icon: "🛏️", label: "2 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🌊", label: "Ocean View" },
        { icon: "🏖️", label: "Beach Access" },
        { icon: "📶", label: "High-Speed WiFi" },
        { icon: "🍽️", label: "Modern Kitchen" },
        { icon: "🧘", label: "Yoga Studio" },
        { icon: "🛎️", label: "Concierge Service" },
      ],
    },
    3: {
      title: "Executive City Apartment",
      location: "Ikoyi",
      price: "₦150,000",
      image: "/assets/images/homes/home3.jpg",
      description:
        "Discover sophisticated living in this expansive 4-bedroom residence located in Lagos' most prestigious neighborhood. With elegant Nigerian design aesthetics, ambient lighting, high-end furniture, and stunning city skyline views. This property epitomizes luxury and exclusivity in the heart of Ikoyi.",
      features: [
        { icon: "🛏️", label: "4 Bedrooms" },
        { icon: "🚿", label: "3 Bathrooms" },
        { icon: "🅿️", label: "Private Parking" },
        { icon: "🔒", label: "Premium Security" },
        { icon: "📶", label: "Fiber Internet" },
        { icon: "🎭", label: "Entertainment Room" },
        { icon: "🍷", label: "Wine Cellar" },
        { icon: "👔", label: "Butler Service" },
      ],
    },
    4: {
      title: "Infinity Pool Residence",
      location: "Eko Atlantic",
      price: "₦180,000",
      image: "/assets/images/homes/home4.jpg",
      description:
        "Experience ultra-modern living in this spectacular 3-bedroom apartment featuring a rooftop infinity pool with breathtaking Lagos skyline views. Located in the futuristic Eko Atlantic development, this property offers world-class amenities including 24/7 concierge, smart home technology, and unparalleled luxury.",
      features: [
        { icon: "🛏️", label: "3 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🏊", label: "Rooftop Pool" },
        { icon: "🛎️", label: "Concierge 24/7" },
        { icon: "🤖", label: "Smart Home" },
        { icon: "🌆", label: "Skyline View" },
        { icon: "🎾", label: "Tennis Court" },
        { icon: "☕", label: "Rooftop Lounge" },
      ],
    },
    5: {
      title: "Seaside Contemporary Flat",
      location: "Lekki Phase 1",
      price: "₦95,000",
      image: "/assets/images/homes/home5.jpg",
      description:
        "Modern 3-bedroom apartment with stunning seaside views, designer interiors, and a spacious open-plan living area. Perfect for families or executives looking for comfort and style.",
      features: [
        { icon: "🛏️", label: "3 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🏊", label: "Pool Access" },
        { icon: "💪", label: "Gym" },
        { icon: "📶", label: "WiFi" },
        { icon: "❄️", label: "Air Conditioning" },
        { icon: "🅿️", label: "Private Parking" },
        { icon: "🔒", label: "24/7 Security" },
      ],
    },
    6: {
      title: "Victoria Island Modern Flat",
      location: "Victoria Island",
      price: "₦110,000",
      image: "/assets/images/homes/home6.jpg",
      description:
        "2-bedroom modern apartment with bright interiors, ocean-facing balcony, and premium appliances. Ideal for couples or small families seeking a luxurious stay in Victoria Island.",
      features: [
        { icon: "🛏️", label: "2 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🌊", label: "Ocean View" },
        { icon: "📶", label: "High-Speed WiFi" },
        { icon: "🍽️", label: "Modern Kitchen" },
        { icon: "🛎️", label: "Concierge" },
        { icon: "💨", label: "Balcony" },
        { icon: "❄️", label: "Air Conditioning" },
      ],
    },
    7: {
      title: "Ikoyi Designer Apartment",
      location: "Ikoyi",
      price: "₦140,000",
      image: "/assets/images/homes/home7.jpg",
      description:
        "2-bedroom designer apartment with elegant interiors, smart appliances, and city skyline views. Perfect for business professionals and small families.",
      features: [
        { icon: "🛏️", label: "2 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🏢", label: "City View" },
        { icon: "📶", label: "Fiber Internet" },
        { icon: "🎨", label: "Designer Furniture" },
        { icon: "💨", label: "Balcony" },
        { icon: "🔒", label: "24/7 Security" },
        { icon: "🛎️", label: "Concierge Service" },
      ],
    },
    8: {
      title: "Eko Atlantic Sky Villa",
      location: "Eko Atlantic",
      price: "₦190,000",
      image: "/assets/images/homes/home8.jpg",
      description:
        "Spacious 4-bedroom villa with rooftop terrace, infinity pool, and breathtaking skyline views. Luxurious furnishings and smart home features included.",
      features: [
        { icon: "🛏️", label: "4 Bedrooms" },
        { icon: "🚿", label: "3 Bathrooms" },
        { icon: "🏊", label: "Infinity Pool" },
        { icon: "🎾", label: "Tennis Court" },
        { icon: "📶", label: "High-Speed Internet" },
        { icon: "🛎️", label: "Concierge Service" },
        { icon: "☕", label: "Rooftop Lounge" },
        { icon: "🌆", label: "Skyline View" },
      ],
    },
    9: {
      title: "Lekki Family Duplex",
      location: "Lekki Phase 2",
      price: "₦130,000",
      image: "/assets/images/homes/home9.jpg",
      description:
        "3-bedroom family duplex with modern Nigerian design, spacious living areas, and garden terrace. Perfect for families looking for a peaceful yet luxurious stay.",
      features: [
        { icon: "🛏️", label: "3 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🌳", label: "Garden Terrace" },
        { icon: "🅿️", label: "Private Parking" },
        { icon: "📶", label: "WiFi" },
        { icon: "💨", label: "Balcony" },
        { icon: "🔒", label: "24/7 Security" },
        { icon: "🏊", label: "Private Pool" },
      ],
    },
    10: {
      title: "Victoria Island Penthouse Loft",
      location: "Victoria Island",
      price: "₦220,000",
      image: "/assets/images/homes/home10.jpg",
      description:
        "Luxury penthouse loft with panoramic ocean views, high ceilings, and modern minimalist interiors. Perfect for executive stays or lavish vacations.",
      features: [
        { icon: "🛏️", label: "3 Bedrooms" },
        { icon: "🚿", label: "3 Bathrooms" },
        { icon: "🌊", label: "Ocean View" },
        { icon: "🍷", label: "Wine Cellar" },
        { icon: "📶", label: "Fiber Internet" },
        { icon: "🎨", label: "Designer Furniture" },
        { icon: "💨", label: "Balcony" },
        { icon: "🛎️", label: "Concierge Service" },
      ],
    },
    11: {
      title: "Ikoyi Waterfront Condo",
      location: "Ikoyi",
      price: "₦160,000",
      image: "/assets/images/homes/home11.jpg",
      description:
        "Modern 2-bedroom condo with waterfront views, open-plan living spaces, and luxury finishes. Ideal for a peaceful yet stylish stay in Ikoyi.",
      features: [
        { icon: "🛏️", label: "2 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🌊", label: "Waterfront View" },
        { icon: "📶", label: "High-Speed Internet" },
        { icon: "💨", label: "Balcony" },
        { icon: "🛎️", label: "Concierge" },
        { icon: "🔒", label: "24/7 Security" },
        { icon: "🏢", label: "City View" },
      ],
    },
    12: {
      title: "Eko Atlantic Luxury Suite",
      location: "Eko Atlantic",
      price: "₦200,000",
      image: "/assets/images/homes/home12.jpg",
      description:
        "Spacious 3-bedroom luxury suite with panoramic city and ocean views. Features state-of-the-art appliances, smart home integration, and access to world-class amenities.",
      features: [
        { icon: "🛏️", label: "3 Bedrooms" },
        { icon: "🚿", label: "2 Bathrooms" },
        { icon: "🏊", label: "Infinity Pool" },
        { icon: "💪", label: "Gym Access" },
        { icon: "📶", label: "High-Speed Internet" },
        { icon: "💨", label: "Balcony" },
        { icon: "🛎️", label: "Concierge" },
        { icon: "🌆", label: "Skyline View" },
      ],
    },
  };

  // ==========================================
  // Property Modal Functions
  // ==========================================
  function openPropertyModal(propertyId) {
    propertyId = parseInt(propertyId);
    const property = propertyData[propertyId];

    if (!property) return;

    modalBody.innerHTML = `
    <button id="backBtn" style="position: absolute; top: 24px; left: 24px; width: 48px; height: 48px; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 50%; display: none; align-items: center; justify-content: center; z-index: 10; transition: all 0.3s ease; border: 2px solid rgba(128, 128, 128, 0.3); cursor: pointer;">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    <div class="modal-image-container">
      <img src="${property.image}" alt="${property.title}" class="modal-image">
    </div>
    <div class="modal-info" id="propertyContent">
      <div class="modal-header">
        <div class="modal-header-left">
          <div class="modal-location">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 8.5C8.82843 8.5 9.5 7.82843 9.5 7C9.5 6.17157 8.82843 5.5 8 5.5C7.17157 5.5 6.5 6.17157 6.5 7C6.5 7.82843 7.17157 8.5 8 8.5Z" stroke="currentColor" stroke-width="1.5"/>
              <path d="M8 14C10 11 13 8.5 13 6.5C13 3.73858 10.7614 1.5 8 1.5C5.23858 1.5 3 3.73858 3 6.5C3 8.5 6 11 8 14Z" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <span>${property.location}</span>
          </div>
          <h2 class="modal-title">${property.title}</h2>
        </div>
        <div class="modal-price">
          <span class="modal-price-amount">${property.price}</span>
          <span class="modal-price-period">/night</span>
        </div>
      </div>
      <p class="modal-description">${property.description}</p>
      <div class="modal-features">
        ${property.features
          .map(
            (feature) => `
          <div class="modal-feature">
            <div class="modal-feature-icon">${feature.icon}</div>
            <div class="modal-feature-text">
              <div class="modal-feature-label">${feature.label}</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary" onclick="location.href='#contact'">Book Now</button>
        <button class="btn btn-success" id="proceedBtn">Proceed</button>
      </div>
    </div>

    <div id="bookingCalendar" style="display:none; opacity:0; padding: 3rem 3rem 3.5rem 3rem; background: #2a2a2a;">
      <!-- Custom Calendar Display -->
      <div id="calendarDisplay" style="background: rgba(26, 26, 26, 0.5); border-radius: 16px; padding: 20px; border: 1px solid rgba(128, 128, 128, 0.2); margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <button id="prevMonth" style="background: none; border: none; color: #f5f5f5; cursor: pointer; font-size: 20px; padding: 8px;">←</button>
          <h3 id="currentMonth" style="color: #f5f5f5; margin: 0; font-size: 18px; font-weight: 600;"></h3>
          <button id="nextMonth" style="background: none; border: none; color: #f5f5f5; cursor: pointer; font-size: 20px; padding: 8px;">→</button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-bottom: 12px;">
          <div style="text-align: center; color: #888; font-size: 12px; font-weight: 600;">Sun</div>
          <div style="text-align: center; color: #888; font-size: 12px; font-weight: 600;">Mon</div>
          <div style="text-align: center; color: #888; font-size: 12px; font-weight: 600;">Tue</div>
          <div style="text-align: center; color: #888; font-size: 12px; font-weight: 600;">Wed</div>
          <div style="text-align: center; color: #888; font-size: 12px; font-weight: 600;">Thu</div>
          <div style="text-align: center; color: #888; font-size: 12px; font-weight: 600;">Fri</div>
          <div style="text-align: center; color: #888; font-size: 12px; font-weight: 600;">Sat</div>
        </div>
        <div id="calendarDays" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px;"></div>
      </div>

      <!-- Date Inputs Below Calendar -->
      <div style="display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 200px;">
          <label style="display: block; color: #f0f0f0; margin-bottom: 6px; font-size: 14px; font-weight: 500;">Check-in Date</label>
          <input type="date" id="checkIn" style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid rgba(128,128,128,0.3); background: #1a1a1a; color: #f5f5f5; font-size: 14px;">
        </div>
        <div style="flex: 1; min-width: 200px;">
          <label style="display: block; color: #f0f0f0; margin-bottom: 6px; font-size: 14px; font-weight: 500;">Check-out Date</label>
          <input type="date" id="checkOut" style="width: 100%; padding: 12px; border-radius: 12px; border: 1px solid rgba(128,128,128,0.3); background: #1a1a1a; color: #f5f5f5; font-size: 14px;">
        </div>
      </div>

      <div id="totalPriceDisplay" style="margin-bottom: 16px; padding: 16px; background: rgba(34, 197, 94, 0.1); border-radius: 12px; border: 1px solid rgba(34, 197, 94, 0.3); color: #f5f5f5; font-size: 18px; font-weight: 700; text-align: center;"></div>

      <div class="modal-actions">
        <button class="btn btn-primary" onclick="location.href='#contact'">Book Now</button>
        <button class="btn btn-success" id="whatsappBooking">WhatsApp Booking</button>
      </div>
    </div>
  `;

    propertyModal.classList.add("active");
    document.body.style.overflow = "hidden";

    const backBtn = document.getElementById("backBtn");
    const proceedBtn = document.getElementById("proceedBtn");
    const propertyContent = document.getElementById("propertyContent");
    const bookingCalendar = document.getElementById("bookingCalendar");
    const whatsappBooking = document.getElementById("whatsappBooking");
    const checkIn = document.getElementById("checkIn");
    const checkOut = document.getElementById("checkOut");
    const totalPriceDisplay = document.getElementById("totalPriceDisplay");
    const calendarDays = document.getElementById("calendarDays");
    const currentMonthEl = document.getElementById("currentMonth");
    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");

    let currentDate = new Date();
    let selectedCheckIn = null;
    let selectedCheckOut = null;

    function renderCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();

      currentMonthEl.textContent = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      calendarDays.innerHTML = "";

      // Empty cells for days before month starts
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarDays.appendChild(emptyCell);
      }

      // Calendar days
      for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date(year, month, day);
        const dayEl = document.createElement("div");
        dayEl.textContent = day;
        dayEl.style.cssText = `
        padding: 10px;
        text-align: center;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        color: #f5f5f5;
        font-weight: 500;
        font-size: 14px;
      `;

        const isPast = dayDate < today;
        const isSelected =
          (selectedCheckIn &&
            dayDate.getTime() === selectedCheckIn.getTime()) ||
          (selectedCheckOut &&
            dayDate.getTime() === selectedCheckOut.getTime());
        const isInRange =
          selectedCheckIn &&
          selectedCheckOut &&
          dayDate > selectedCheckIn &&
          dayDate < selectedCheckOut;

        if (isPast) {
          dayEl.style.color = "#555";
          dayEl.style.cursor = "not-allowed";
        } else if (isSelected) {
          dayEl.style.background = "#22c55e";
          dayEl.style.color = "#000";
          dayEl.style.fontWeight = "700";
        } else if (isInRange) {
          dayEl.style.background = "rgba(34, 197, 94, 0.2)";
        } else {
          dayEl.style.background = "rgba(255, 255, 255, 0.05)";
          dayEl.addEventListener("mouseenter", () => {
            if (!isPast) dayEl.style.background = "rgba(34, 197, 94, 0.3)";
          });
          dayEl.addEventListener("mouseleave", () => {
            if (!isPast && !isSelected && !isInRange)
              dayEl.style.background = "rgba(255, 255, 255, 0.05)";
          });
        }

        if (!isPast) {
          dayEl.addEventListener("click", () => {
            if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
              selectedCheckIn = dayDate;
              selectedCheckOut = null;
              checkIn.value = formatDate(dayDate);
              checkOut.value = "";
            } else {
              if (dayDate > selectedCheckIn) {
                selectedCheckOut = dayDate;
                checkOut.value = formatDate(dayDate);
                calculateTotal();
              } else {
                selectedCheckIn = dayDate;
                selectedCheckOut = null;
                checkIn.value = formatDate(dayDate);
                checkOut.value = "";
              }
            }
            renderCalendar(currentDate);
          });
        }

        calendarDays.appendChild(dayEl);
      }
    }

    function formatDate(date) {
      return date.toISOString().split("T")[0];
    }

    function calculateTotal() {
      if (checkIn.value && checkOut.value) {
        const checkInDate = new Date(checkIn.value);
        const checkOutDate = new Date(checkOut.value);
        const nights = Math.ceil(
          (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
        );

        if (nights > 0) {
          const pricePerNight = parseFloat(
            property.price.replace(/[^0-9.-]+/g, "")
          );
          const totalPrice = nights * pricePerNight;
          totalPriceDisplay.textContent = `Total: ₦${totalPrice.toLocaleString()} for ${nights} night(s)`;
          totalPriceDisplay.style.display = "block";
        } else {
          totalPriceDisplay.textContent = "";
          totalPriceDisplay.style.display = "none";
        }
      } else {
        totalPriceDisplay.textContent = "";
        totalPriceDisplay.style.display = "none";
      }
    }

    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });

    checkIn.addEventListener("change", () => {
      if (checkIn.value) {
        selectedCheckIn = new Date(checkIn.value);
        renderCalendar(currentDate);
      }
      calculateTotal();
    });

    checkOut.addEventListener("change", () => {
      if (checkOut.value) {
        selectedCheckOut = new Date(checkOut.value);
        renderCalendar(currentDate);
      }
      calculateTotal();
    });

    proceedBtn.addEventListener("click", () => {
      propertyContent.style.transition = "opacity 0.5s";
      propertyContent.style.opacity = 0;

      setTimeout(() => {
        propertyContent.style.display = "none";
        bookingCalendar.style.display = "block";
        backBtn.style.display = "flex";

        setTimeout(() => {
          bookingCalendar.style.transition = "opacity 0.5s";
          bookingCalendar.style.opacity = 1;
          renderCalendar(currentDate);

          // Scroll to top of modal
          modalBody.scrollTop = 0;
        }, 50);
      }, 500);
    });

    backBtn.addEventListener("click", () => {
      bookingCalendar.style.transition = "opacity 0.5s";
      bookingCalendar.style.opacity = 0;

      setTimeout(() => {
        bookingCalendar.style.display = "none";
        backBtn.style.display = "none";
        propertyContent.style.display = "block";

        setTimeout(() => {
          propertyContent.style.transition = "opacity 0.5s";
          propertyContent.style.opacity = 1;

          // Scroll to top of modal
          modalBody.scrollTop = 0;
        }, 50);
      }, 500);
    });

    whatsappBooking.addEventListener("click", () => {
      if (!checkIn.value || !checkOut.value) {
        alert("Please select both check-in and check-out dates.");
        return;
      }

      const checkInDate = new Date(checkIn.value);
      const checkOutDate = new Date(checkOut.value);
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      if (nights < 1) {
        alert("Check-out date must be after check-in date.");
        return;
      }

      const pricePerNight = parseFloat(
        property.price.replace(/[^0-9.-]+/g, "")
      );
      const totalPrice = nights * pricePerNight;

      const message = `Hi, I'd like to book "${property.title}" at ₦${
        property.price
      }/night for ${nights} night(s) (${checkIn.value} to ${
        checkOut.value
      }). Total: ₦${totalPrice.toLocaleString()}.`;

      window.open(
        `https://wa.me/2349025254478?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    });
  }

  function closePropertyModal() {
    propertyModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event listeners
  quickViewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const propertyCard = button.closest(".property-card");
      const propertyId = propertyCard.dataset.property;
      openPropertyModal(propertyId);
    });
  });

  document.querySelectorAll(".property-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (
        e.target.closest(".property-favorite") ||
        e.target.closest(".quick-view-btn")
      ) {
        return;
      }
      const propertyId = card.dataset.property;
      openPropertyModal(propertyId);
    });
  });

  modalClose.addEventListener("click", closePropertyModal);
  modalOverlay.addEventListener("click", closePropertyModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && propertyModal.classList.contains("active")) {
      closePropertyModal();
    }
  });

  // ==========================================
  // Lifestyle Slider
  // ==========================================
  let currentSlide = 0;
  const slides = document.querySelectorAll(".lifestyle-slide");
  const totalSlides = slides.length;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    lifestyleDots.appendChild(dot);
  }

  const dots = document.querySelectorAll(".slider-dot");

  function updateSlider() {
    lifestyleTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  lifestyleNext.addEventListener("click", nextSlide);
  lifestylePrev.addEventListener("click", prevSlide);

  // Auto-advance slider
  let sliderInterval = setInterval(nextSlide, 5000);

  // Pause auto-advance on hover
  const lifestyleSlider = document.querySelector(".lifestyle-slider");
  lifestyleSlider.addEventListener("mouseenter", () => {
    clearInterval(sliderInterval);
  });

  lifestyleSlider.addEventListener("mouseleave", () => {
    sliderInterval = setInterval(nextSlide, 5000);
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lifestyleSlider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  lifestyleSlider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
    }
  }

  // ==========================================
  // Favorite Button Toggle
  // ==========================================
  document.querySelectorAll(".property-favorite").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();

      const svg = button.querySelector("svg");
      const path = svg.querySelector("path");

      if (path.getAttribute("fill") === "none" || !path.getAttribute("fill")) {
        path.setAttribute("fill", "#e74c3c");
        path.setAttribute("stroke", "#e74c3c");
      } else {
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "currentColor");
      }
    });
  });

  // ==========================================
  // Smooth Scroll Enhancement
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Skip if it's just "#" or opening modal
      if (href === "#" || this.classList.contains("quick-view-btn")) return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ==========================================
  // Intersection Observer for Animations
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe animated elements
  document
    .querySelectorAll(".property-card, .service-card, .testimonial-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
      observer.observe(el);
    });

  // ==========================================
  // Page Load Animation
  // ==========================================
  window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease-in";

    setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);
  });

  // ==========================================
  // Console Branding
  // ==========================================
  console.log(
    "%c🏝️ Lagos Luxury Stays",
    "font-size: 24px; font-weight: bold; color: #c9a961;"
  );
  console.log(
    "%cPremium Airbnb & Shortlet Management in Lagos",
    "font-size: 14px; color: #666;"
  );
  console.log("%cProudly Nigerian 🇳🇬", "font-size: 12px; color: #008751;");
});
