 const products = [
            {
                id: 1,
                category: "phone",
                price: 999.99,
                name: "Premium Smartphone X",
                description: "Latest flagship smartphone with AMOLED display, triple camera system, and 5G connectivity.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Smartphone+X"
            },
            {
                id: 2,
                category: "computer",
                price: 1299.99,
                name: "Ultrabook Pro",
                description: "Thin and light laptop with powerful processor, 16GB RAM, and long battery life for productivity on the go.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Ultrabook+Pro"
            },
            {
                id: 3,
                category: "accessory",
                price: 129.99,
                name: "Wireless Noise-Canceling Headphones",
                description: "Premium headphones with active noise cancellation and 30-hour battery life.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Headphones"
            },
            {
                id: 4,
                category: "phone",
                price: 699.99,
                name: "Budget Smartphone",
                description: "Affordable smartphone with great camera and all-day battery life.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Budget+Phone"
            },
            {
                id: 5,
                category: "computer",
                price: 1999.99,
                name: "Gaming Laptop",
                description: "High-performance gaming laptop with dedicated graphics card and high refresh rate display.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Gaming+Laptop"
            },
            {
                id: 6,
                category: "accessory",
                price: 89.99,
                name: "Smart Watch",
                description: "Feature-packed smartwatch with health monitoring and notification support.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Smart+Watch"
            },
            {
                id: 7,
                category: "accessory",
                price: 49.99,
                name: "Wireless Charger",
                description: "Fast wireless charger compatible with all Qi-enabled devices.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Wireless+Charger"
            },
            {
                id: 8,
                category: "computer",
                price: 2499.99,
                name: "Desktop Workstation",
                description: "Powerful desktop computer for professionals and content creators.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Workstation"
            },
            {
                id: 9,
                category: "phone",
                price: 1199.99,
                name: "Foldable Phone",
                description: "Innovative foldable smartphone with flexible display and multitasking capabilities.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Foldable+Phone"
            },
            {
                id: 10,
                category: "accessory",
                price: 199.99,
                name: "Premium Earbuds",
                description: "True wireless earbuds with excellent sound quality and noise cancellation.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Earbuds"
            },
            {
                id: 11,
                category: "computer",
                price: 899.99,
                name: "Student Laptop",
                description: "Reliable laptop for students with all-day battery and lightweight design.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Student+Laptop"
            },
            {
                id: 12,
                category: "phone",
                price: 849.99,
                name: "Mid-Range Phone",
                description: "Balance of performance and price with excellent camera capabilities.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Mid-Range+Phone"
            },
            {
                id: 13,
                category: "accessory",
                price: 79.99,
                name: "Portable SSD",
                description: "Fast external storage with high transfer speeds and durable design.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Portable+SSD"
            },
            {
                id: 14,
                category: "computer",
                price: 1799.99,
                name: "2-in-1 Convertible",
                description: "Versatile laptop that converts to a tablet with touchscreen and stylus support.",
                image: "https://placehold.co/300x300/6e8efb/white?text=2-in-1+Laptop"
            },
            {
                id: 15,
                category: "accessory",
                price: 29.99,
                name: "Bluetooth Speaker",
                description: "Portable speaker with rich sound and waterproof design.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Bluetooth+Speaker"
            },
            {
                id: 16,
                category: "phone",
                price: 549.99,
                name: "Compact Phone",
                description: "Small form factor phone with flagship features and comfortable grip.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Compact+Phone"
            },
            {
                id: 17,
                category: "computer",
                price: 2999.99,
                name: "Gaming Desktop",
                description: "High-end gaming PC with liquid cooling and RGB lighting.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Gaming+Desktop"
            },
            {
                id: 18,
                category: "accessory",
                price: 149.99,
                name: "Mechanical Keyboard",
                description: "Tactile mechanical keyboard with customizable RGB lighting.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Mechanical+Keyboard"
            },
            {
                id: 19,
                category: "phone",
                price: 449.99,
                name: "Long-Battery Phone",
                description: "Smartphone with exceptional battery life that lasts for days.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Long+Battery+Phone"
            },
            {
                id: 20,
                category: "accessory",
                price: 99.99,
                name: "4K Webcam",
                description: "High-resolution webcam with autofocus and noise-canceling microphone.",
                image: "https://placehold.co/300x300/6e8efb/white?text=4K+Webcam"
            },
            {
                id: 21,
                category: "computer",
                price: 1599.99,
                name: "Content Creator Laptop",
                description: "Powerful machine optimized for video editing and graphic design.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Creator+Laptop"
            },
            {
                id: 22,
                category: "accessory",
                price: 39.99,
                name: "USB-C Hub",
                description: "Multi-port adapter for laptops with limited connectivity options.",
                image: "https://placehold.co/300x300/6e8efb/white?text=USB-C+Hub"
            },
            {
                id: 23,
                category: "phone",
                price: 799.99,
                name: "Camera Phone",
                description: "Smartphone with professional-grade camera system for photography enthusiasts.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Camera+Phone"
            },
            {
                id: 24,
                category: "computer",
                price: 999.99,
                name: "Mini PC",
                description: "Compact desktop computer with powerful performance in a small form factor.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Mini+PC"
            },
            {
                id: 25,
                category: "accessory",
                price: 69.99,
                name: "Ergonomic Mouse",
                description: "Comfortable mouse designed to reduce wrist strain during long work sessions.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Ergonomic+Mouse"
            },
            {
                id: 26,
                category: "phone",
                price: 379.99,
                name: "Entry-Level Smartphone",
                description: "Affordable smartphone with essential features for everyday use.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Entry+Phone"
            },
            {
                id: 27,
                category: "computer",
                price: 2199.99,
                name: "Business Laptop",
                description: "Secure laptop with enterprise-level security features and premium build quality.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Business+Laptop"
            },
            {
                id: 28,
                category: "accessory",
                price: 199.99,
                name: "Drawing Tablet",
                description: "Graphics tablet for digital artists with pressure-sensitive stylus.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Drawing+Tablet"
            },
            {
                id: 29,
                category: "phone",
                price: 1299.99,
                name: "Pro Photography Phone",
                description: "Smartphone with advanced camera controls and large sensor for professional photography.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Pro+Photo+Phone"
            },
            {
                id: 30,
                category: "accessory",
                price: 89.99,
                name: "Portable Monitor",
                description: "15-inch portable monitor that connects via USB-C for on-the-go productivity.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Portable+Monitor"
            },
            {
                id: 31,
                category: "computer",
                price: 1399.99,
                name: "Ryzen Gaming Laptop",
                description: "AMD-powered gaming laptop with high refresh rate display and powerful graphics.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Ryzen+Laptop"
            },
            {
                id: 32,
                category: "accessory",
                price: 24.99,
                name: "Phone Case",
                description: "Protective case with drop protection and stylish design.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Phone+Case"
            },
            {
                id: 33,
                category: "phone",
                price: 599.99,
                name: "5G Mid-Range",
                description: "Affordable 5G smartphone with fast connectivity and modern features.",
                image: "https://placehold.co/300x300/6e8efb/white?text=5G+Phone"
            },
            {
                id: 34,
                category: "computer",
                price: 799.99,
                name: "Chromebook",
                description: "Cloud-based laptop with fast boot times and simple interface.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Chromebook"
            },
            {
                id: 35,
                category: "accessory",
                price: 159.99,
                name: "Noise Canceling Earbuds",
                description: "Wireless earbuds with active noise cancellation and premium sound.",
                image: "https://placehold.co/300x300/6e8efb/white?text=NC+Earbuds"
            },
            {
                id: 36,
                category: "phone",
                price: 899.99,
                name: "Gaming Phone",
                description: "Smartphone optimized for gaming with shoulder triggers and cooling system.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Gaming+Phone"
            },
            {
                id: 37,
                category: "computer",
                price: 1899.99,
                name: "MacBook Alternative",
                description: "Windows laptop with premium build quality and high-resolution display.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Premium+Laptop"
            },
            {
                id: 38,
                category: "accessory",
                price: 129.99,
                name: "Docking Station",
                description: "Universal docking station with multiple ports for desktop-like connectivity.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Docking+Station"
            },
            {
                id: 39,
                category: "phone",
                price: 999.99,
                name: "Business Smartphone",
                description: "Secure smartphone with enhanced privacy features and extended security updates.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Business+Phone"
            },
            {
                id: 40,
                category: "accessory",
                price: 49.99,
                name: "Power Bank",
                description: "High-capacity portable charger with fast charging support.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Power+Bank"
            },
            {
                id: 41,
                category: "computer",
                price: 2999.99,
                name: "Workstation Laptop",
                description: "Mobile workstation with professional-grade graphics and Xeon processor.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Workstation+Laptop"
            },
            {
                id: 42,
                category: "accessory",
                price: 79.99,
                name: "Gaming Mouse",
                description: "High-DPI gaming mouse with customizable weights and RGB lighting.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Gaming+Mouse"
            },
            {
                id: 43,
                category: "phone",
                price: 749.99,
                name: "Ultra-Fast Charging Phone",
                description: "Smartphone that charges from 0 to 100% in under 30 minutes.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Fast+Charge+Phone"
            },
            {
                id: 44,
                category: "computer",
                price: 1499.99,
                name: "All-in-One Desktop",
                description: "Sleek all-in-one computer with minimalist design and powerful performance.",
                image: "https://placehold.co/300x300/6e8efb/white?text=All-in-One+PC"
            },
            {
                id: 45,
                category: "accessory",
                price: 199.99,
                name: "Smart Home Hub",
                description: "Central controller for smart home devices with voice assistant support.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Smart+Home+Hub"
            },
            {
                id: 46,
                category: "phone",
                price: 1199.99,
                name: "Foldable Pro",
                description: "Premium foldable smartphone with large flexible display and multitasking features.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Foldable+Pro"
            },
            {
                id: 47,
                category: "computer",
                price: 999.99,
                name: "Family Desktop",
                description: "Reliable desktop computer for home use with ample storage and memory.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Family+Desktop"
            },
            {
                id: 48,
                category: "accessory",
                price: 29.99,
                name: "Cable Organizer",
                description: "Set of cable management solutions to keep your workspace tidy.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Cable+Organizer"
            },
            {
                id: 49,
                category: "phone",
                price: 849.99,
                name: "Waterproof Phone",
                description: "Rugged smartphone with IP68 rating and military-grade durability.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Waterproof+Phone"
            },
            {
                id: 50,
                category: "accessory",
                price: 149.99,
                name: "Wireless Gaming Headset",
                description: "Low-latency wireless headset with surround sound and noise cancellation.",
                image: "https://placehold.co/300x300/6e8efb/white?text=Gaming+Headset"
            }
        ];

        export default products; 