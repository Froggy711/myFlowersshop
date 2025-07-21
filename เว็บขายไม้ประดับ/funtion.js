document.addEventListener('DOMContentLoaded', () => {
    // === NEW: Updated Product Data ===
    const products = [
        {
            id: 1,
            name: 'ช่อดอกไม้ (กุหลาบแดง)',
            price: 1199,
            category: 'ช่อดอกไม้',
            description: 'ช่อกุหลาบแดงเกรดพรีเมี่ยม 12 ดอก สื่อถึงความรักที่มั่นคงและอมตะ ห่อด้วยกระดาษสไตล์เกาหลี',
            image: 'https://images.pexels.com/photos/1233414/pexels-photo-1233414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            id: 2,
            name: 'ช่อดอกไม้ (ดอกมะลิ)',
            price: 300,
            category: 'ช่อดอกไม้',
            description: 'ช่อดอกมะลิสีขาวและ ห่ออย่างสวยงาม เหมาะสำหรับวันแม้แห่งชาติ',
            image: 'image/image 2.jpg'
        },
        {
            id: 3,
            name: 'ต้นมอนสเตอร่า (พร้อมกระถาง)',
            price: 850,
            category: 'ไม้ประดับ',
            description: 'ไม้ฟอกอากาศยอดนิยม ช่วยเพิ่มความสดชื่นและมีสไตล์ให้บ้านของคุณ มาพร้อมกระถางเซรามิกสีขาว',
            image: 'image/0b773977-8e5c-471e-a83f-98f69ab32ffd.jpg'
        },
        {
            id: 4,
            name: 'ช่อดอกไม้ (ทานตะวัน)',
            price: 790,
            category: 'ช่อดอกไม้',
            description: 'ช่อดอกทานตะวัน 5 ดอก สัญลักษณ์ของความสดใสร่าเริงและความหวัง มอบพลังบวกให้ผู้รับ',
            image: 'image/images.jpg'
        },
        {
            id: 5,
            name: 'กระบอกเพชร (แมมขนแม)',
            price: 80,
            category: 'ไม้ประดับ',
            description: 'กระบอกเพชรขนาดจิ๋ว ดูแลได้ง่าย เหมาะสำหรับตกแต่งห้องทำงานหรือห้องนั่งเล่น',
            image: 'image/9872186e09c5832803a76baee41e4c7e.jpg'
        },
        {
            id: 6,
            name: 'ช่อดอกไม้คละดอก โทนสีฟ้า',
            price: 1499,
            category: 'ช่อดอกไม้',
            description: 'ช่อดอกไม้คละสีโดย จัดเป็นช่อขนาดใหญ่และมีสีโทนฟ้าสดใส',
            image: 'image/434.jpg'
        },
        {
            id: 7,
            name: 'ช่อดอกไม้รับปริญญา',
            price: 1199,
            category: 'ช่อดอกไม้',
            description: 'ช่อดอกไม้รับปริญญา ของใหม่พึ่งลงสต็อก',
            image: 'image/20221016154450-6422.jpeg'
        },
        {
            id: 8,
            name: 'ตะกร้าดอกไม้สด',
            price: 1250,
            category: 'ตะกร้าดอกไม้',
            description: 'ตะกร้ารวมดอกไม้สดใส โทนสีส้ม-เหลือง เหมาะสำหรับมอบให้ผู้ใหญ่ หรือแสดงความขอบคุณ',
            image: 'image/Basket-of-flowers-in-yellow-oran.jpg'
        },
        {
            id: 9,
            name: 'พวงมาลัย',
            price: 250,
            category: 'พวงมาลัย',
            description: 'พวงมาลัยดอกมะลิและกุหลาบ ร้อยอย่างประณีต สื่อถึงความเคารพและความปรารถนาดี',
            image: 'image/pngtree-thai-garland-tradition-p.jpg'
        }
    ];

    // === DOM Elements ===
    const productList = document.getElementById('product-list');
    const filterContainer = document.getElementById('filter-container');
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const checkoutForm = document.getElementById('checkout-form');
    const toast = document.getElementById('toast');
    const searchInput = document.getElementById('search-input'); // NEW

    let cart = [];

    // === Functions ===

    // MODIFIED: เพิ่ม searchTerm parameter สำหรับการค้นหา
    function renderProducts(filter = 'all', sortBy = 'default', searchTerm = '') {
        // 1. กรองตามหมวดหมู่
        let processedProducts = products.filter(product => filter === 'all' || product.category === filter);

        // 2. กรองตามคำค้นหา
        const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
        if (lowerCaseSearchTerm) {
            processedProducts = processedProducts.filter(product =>
                product.name.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        // 3. เรียงลำดับ
        if (sortBy === 'price-asc') {
            processedProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            processedProducts.sort((a, b) => b.price - a.price);
        }

        // 4. แสดงผล
        productList.innerHTML = processedProducts.map(product => `
            <div class="product-card" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-details">
                    <h3>${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">${product.price.toFixed(2)} บาท</p>
                    <button class="btn add-to-cart" data-id="${product.id}">หยิบใส่ตะกร้า</button>
                </div>
            </div>
        `).join('');
    }

    function renderFilterButtons() {
        const categories = ['all', ...new Set(products.map(p => p.category))];
        filterContainer.innerHTML = categories.map(category => {
            const displayName = category === 'all' ? 'ทั้งหมด' : category;
            return `<button class="filter-btn ${category === 'all' ? 'active' : ''}" data-filter="${category}">${displayName}</button>`;
        }).join('');
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        showToast(`เพิ่ม '${product.name}' ลงตะกร้าแล้ว!`);
        renderCart();
    }

    function updateQuantity(productId, newQuantity) {
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            if (newQuantity > 0) {
                cartItem.quantity = newQuantity;
            } else {
                cart = cart.filter(item => item.id !== productId);
            }
        }
        renderCart();
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888;">ตะกร้าของคุณยังว่างอยู่ค่ะ</p>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <strong>${item.name}</strong><br>
                        <span>${item.price.toFixed(2)} บาท</span>
                    </div>
                    <div class="cart-item-actions">
                        <button class="quantity-btn" data-id="${item.id}" data-change="-1">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" data-id="${item.id}" data-change="1">+</button>
                        <button class="remove-btn" data-id="${item.id}">×</button>
                    </div>
                </div>`).join('');
        }
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = totalItems;
        checkoutButton.disabled = cart.length === 0;
    }

    // === Event Listeners ===

    // MODIFIED: เพิ่มการดึงค่าจากช่องค้นหา
    function updateProductDisplay() {
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        const sortBy = document.querySelector('.custom-select').dataset.value;
        const searchTerm = searchInput.value; // ดึงค่าจากช่องค้นหา
        renderProducts(activeFilter, sortBy, searchTerm); // ส่งค่าทั้ง 3 ตัวไป render
    }

    filterContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');
            updateProductDisplay();
        }
    });
    
    // NEW: เพิ่ม Event Listener สำหรับช่องค้นหา
    searchInput.addEventListener('input', () => {
        updateProductDisplay();
    });

    // --- โค้ดควบคุม Custom Select Dropdown ---
    const customSelect = document.querySelector('.custom-select');
    if (customSelect) {
        const trigger = customSelect.querySelector('.custom-select__trigger');
        const options = customSelect.querySelectorAll('.custom-option');
        const triggerSpan = trigger.querySelector('span');

        trigger.addEventListener('click', () => {
            customSelect.classList.toggle('open');
        });

        options.forEach(option => {
            option.addEventListener('click', () => {
                if (!option.classList.contains('selected')) {
                    const selectedValue = option.getAttribute('data-value');
                    triggerSpan.textContent = option.textContent;
                    customSelect.dataset.value = selectedValue;
                    customSelect.querySelector('.custom-option.selected').classList.remove('selected');
                    option.classList.add('selected');
                    updateProductDisplay();
                }
                customSelect.classList.remove('open');
            });
        });

        window.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    }

    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(parseInt(e.target.dataset.id));
        }
    });

    cartItemsContainer.addEventListener('click', (e) => {
        const target = e.target;
        const productId = parseInt(target.dataset.id);
        if (target.classList.contains('quantity-btn')) {
            const change = parseInt(target.dataset.change);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                updateQuantity(productId, cartItem.quantity + change);
            }
        }
        if (target.classList.contains('remove-btn')) {
            updateQuantity(productId, 0);
        }
    });

    function openModal(modal) { modal.style.display = 'block'; }
    function closeModal(modal) { modal.style.display = 'none'; }

    cartIcon.addEventListener('click', () => openModal(cartModal));

    closeButtons.forEach(btn => btn.addEventListener('click', () => {
        closeModal(cartModal);
        closeModal(checkoutModal);
    }));

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) {
            closeModal(cartModal);
            openModal(checkoutModal);
        }
    });

    window.addEventListener('click', (e) => {
        if (e.target == cartModal) closeModal(cartModal);
        if (e.target == checkoutModal) closeModal(checkoutModal);
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(checkoutForm);
        const orderDetails = {
            customer: {
                name: formData.get('name'),
                address: formData.get('address'),
                phone: formData.get('phone'),
            },
            items: cart.map(item => `${item.name} x${item.quantity}`),
            total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
        };
        console.log("--- NEW ORDER RECEIVED ---");
        console.log("Customer:", orderDetails.customer);
        console.log("Items:", orderDetails.items.join('\n'));
        console.log("Total: ", orderDetails.total, "THB");
        console.log("------------------------");
        alert(`ขอบคุณสำหรับคำสั่งซื้อ คุณ ${orderDetails.customer.name}!\nเราได้รับข้อมูลการสั่งซื้อของคุณเรียบร้อยแล้ว`);
        cart = [];
        checkoutForm.reset();
        renderCart();
        closeModal(checkoutModal);
    });

    // --- Initial Load ---
    renderFilterButtons();
    renderProducts();
    renderCart();
});