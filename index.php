<?php
require_once './config/database.php';
spl_autoload_register(function ($className) {
    require_once "./app/models/$className.php";
});

$photoModel  = new Photo();
$allPhoto = $photoModel->getAllPhotos();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./public/assets/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="./public/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="./public/css/style.css">
    <style>
        * {
            box-sizing: border-box;
        }

        .wrap {
            width: 100vw;
            height: 100vh;
            perspective: 500px;
            position: fixed;
        }

        .bg {
            transform-style: preserve-3d;
            width: 100%;
            height: 100%;
            background: url(./public/images/milky_way.jpg);
            background-size: cover;
            background-repeat: no-repeat;
            position: fixed;
            scale: 1.3;
            z-index: -1;
        }

        .parent {
            transform-style: preserve-3d;
            width: 100%;
            height: 100%;
            position: fixed;
            transition: 0.5s ease-out;
            -webkit-transform-origin: 50% 50% -500px;
        }

        .btn-load-more {
            position: absolute;
        }

        .card {
            width: 200px;
            height: auto;
            position: absolute;
            background-color: transparent;
            transition: 0.5s ease-out;
        }

        .card:hover {
            /* Vi translateZ cua card dang set inline => can important de override */
            filter: brightness(120%) !important;
            transform: translateZ(2px) !important;
            box-shadow: 0px 0px 20px yellow !important;
        }

        .card-body {
            background-color: rgba(0, 0, 0, 0.7);
        }
    </style>
</head>

<body>
    <div class="wrap">
        <div class="d-flex position-absolute">
            <button class="btn-load-more z-2" onclick="loadMore(photoIds)">Load more</button>
            <form>
                <input oninput="getProductKeyword(this)" class="form-control me-2 input-search mt-5" type="search" placeholder="Search" aria-label="Search" name="q">
                <!-- Khong su dung search thi bo -->
                <ul class="position-absolute search-result-box">
                    <?php
                    foreach ($allPhoto as $item) {
                    ?>
                        <li class="search-item"><a class="search-item-link" href="#">
                                <img src="./public/images/<?php echo $item['source']; ?>" alt="" class="img-fluid product-photo-search" data-product-id="<?php echo $item['id']; ?>">
                                <h6 class="search-item-name"><?php echo $item['title']; ?></h6>
                            </a>
                        </li>
                    <?php
                    }
                    ?>
                </ul>
            </form>
        </div>
        <div class="parent">

        </div>
        <div class="bg"></div>
    </div>


    <!--  Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <img class="image-modal img-fluid" src="" alt="">
                    <p class="description-modal"></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="./public/js/script.js"></script>
    <script>

    </script>
</body>

</html>