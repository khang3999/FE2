const wrap = document.querySelector('.wrap');
const parent = document.querySelector('.parent');
const background = document.querySelector('.bg');

// Rotate
wrap.addEventListener('mousemove', (event) => {
    // Lay toa do chuot
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    // Tinh diem trung tam
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    // Tinh khoang cach tu diem chuot den tam
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // Tinh goc xoay của parent
    let rotateParentOy = -1 * (deltaX / centerX) * 30;
    let rotateParentOx = (deltaY / centerY) * 30;
    parent.style.transform = `rotateX(${rotateParentOx}deg) rotateY(${rotateParentOy}deg)`;

    // Tinh goc xoay của background
    let rotateBackgroundOy = -1 * (deltaX / centerX) * 5;
    let rotateBackgroundOx = 1 * (deltaY / centerY) * 5;
    background.style.transform = `rotateX(${rotateBackgroundOx}deg) rotateY(${rotateBackgroundOy}deg)`;
})

// Ham loadmore
let photoIds = []
async function loadMore(arrPhotoId) {

    let btnLoadMore = document.querySelector('.btn-load-more');
    btnLoadMore.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span class="visually-hidden" role="status">Loading...</span>`

    const url = 'app/api/photoloadmore.php';
    const data = {
        arrPhotoId: arrPhotoId
    };
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    });
    const result = await response.json();

    result.slice(0, 5).forEach(element => {
        // Tạo photo item
        let div = document.createElement('div')

        div.innerHTML = `
            <div class="card">
                <img onclick="setModal(this, ${element.id})" class="card-img-top" src="./public/images/${element.source}" alt="${element.source}">
                <div class="card-body">
                    <p class="text-light">
                        <i onclick="likes(${element.id}, this)" class="bi bi-heart"></i>
                        <span class="like-number">${element.likes}</span>
                    </p>       
                    <p class="text-light">
                        <i class="bi bi-eye-fill"></i></a>
                        <span class="views-number">${element.views}</span>
                    </p>
                </div>
            </div>
        `;

        let card = div.firstElementChild;

        // Set vi tri hien thi
        card.style.top = Math.floor(Math.random() * 60 + 5) + "%"; // 5->65
        card.style.left = Math.floor(Math.random() * 80 + 5) + "%"; // 5->75

        //Set modal
        card.querySelector('.card-img-top').setAttribute('data-bs-toggle', 'modal')
        card.querySelector('.card-img-top').setAttribute('data-bs-target', '#exampleModal')
        card.querySelector('.card-img-top').setAttribute('data-image', element.source)
        card.querySelector('.card-img-top').setAttribute('data-description', element.description)
        card.querySelector('.card-img-top').setAttribute('data-title', element.title)

        // Phân chia tầng:
        // index.floor
        const floor = Math.random() * 0.9 // Từ 0 -> 0.5
        card.style.transform = `translateZ(-${floor * 500}px)`; // Từ 00 đến 250px vì max floor 0.5
        // Set overplay
        card.style.filter = `brightness(${(1 - floor) * 100 + 10}%)`;

        parent.append(card)

        // Push photoId vao mang arrPhotoId
        arrPhotoId.push(element.id);


    });
    // Set cho nut load more
    if (result.length < 6) {
        btnLoadMore.remove();
    } else {
        btnLoadMore.innerHTML = "Load more";
    }
}
// Gọi lần đầu
loadMore(photoIds);

// Get data model: khi click vao img thuc hien 2 hanh dong: show modal va tang view
function setModal(target, photoId) {
    // Update model
    const image = target.dataset.image
    const description = target.dataset.description
    const title = target.dataset.title

    const imageModal = document.querySelector('.image-modal');
    const descriptionModal = document.querySelector('.description-modal')
    const titleModal = document.querySelector('.modal-title')

    imageModal.setAttribute('src', 'public/images/' + image)
    descriptionModal.textContent = description
    titleModal.textContent =title

    // Tang view 
    views(target, photoId)
}

// Hàm view
async function views(target, photoId) {
    const url = 'app/api/photoview.php';
    const data = {
        photoId: photoId
    };
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    });
    const result = await response.json();
    const card = target.parentNode
    card.querySelector('.views-number').textContent = result.views
}

// Hàm like
async function likes(photoId, target) {
    const url = 'app/api/photolike.php';
    const data = {
        photoId: photoId
    };
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    });
    const result = await response.json();
    const likes = target.nextElementSibling
    console.log(result.likes);
    likes.textContent = result.likes
}

// Hamf search input
async function getProductKeyword(target) {
    // Lấy chuỗi hiện có trong input
    const key = target.value
    // nếu rỗng => result lấy tất cả
    if (key == '') {
        const children = parent.querySelectorAll('.card')
        children.forEach(element => {
            element.style.boxShadow = 'none'
        })
    } else { // result có dữ liệu theo key
        const url = 'app/api/photosearchinput.php';
        const data = {
            key: key
        };
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        });
        const result = await response.json();

        // Nho link thu vien khi su dung
        // <script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js"></script>
        // var instance = new Mark(document.querySelectorAll('.search-item-name'));
        // instance.mark( key, {
        //     "element": "mark",
        // });

        const children = parent.querySelectorAll('.card')
        children.forEach(element => {
            element.style.boxShadow = 'none'
        })

        result.forEach(element => { // lap qua tung reusult lây ra id cua tung result 
            const id = element.id
            photoIds.forEach((element, index) => {
                if (element == id) { // So sanh neu trong mang đã xuất hiện ở màn hình có chứa id của result thì lấy
                    const cardChild = parent.children[index]
                    cardChild.style.boxShadow = '0px 0px 20px yellow';
                }

            });
        });
    }
}
