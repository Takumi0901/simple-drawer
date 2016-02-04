# Simple-Drawer

## ブラウザサポート

- Chrome最新
- Android: 4.1以上
- iOS: 6以上

他はそのうち調べる

## 使い方

head内で
``` html
<link rel="stylesheet" href="dist/css/simple-drawer.css">
```

bodyの終了タグの前
``` html
<script src="dist/js/vendor/jquery-2.1.1.min.js"></script>
<script src="dist/js/jquery.simpledrawer.js"></script>
```


html

``` html
<div class="c-fixed-bar simple-drawer-fixed-bar">
    <span class="c-fixed-bar__icon c-drawer-btn simple-drawer-btn">
        <i class="c-drawer-btn__icon"></i>
    </span>
</div>
<div class="l-wrapper simple-drawer-wrapper">
    <main role="main">
        メインコンテンツ
    </main>
    <div class="c-drawer simple-drawer">
        <div class="simple-drawer-inner">
            <aside role="complementary">
                ドロワー
            </aside>
        </div>
    </div>
</div>
```

JavaScript

``` js
jQuery(document).ready(function($){
    $(".simple-drawer").simpleDrawer();
});
```



## オプション

主にJavaScript側ではクラスの命名とドロワーの向き、barの固定を設定しています

```
btn 			: '.simple-drawer-btn',
bar 			: '.simple-drawer-fixed-bar',
drawer_inner 	: '.simple-drawer-inner',
overlay 		: '.simple-drawer-overlay',
wrapper 		: '.simple-drawer-wrapper',
btnside 		: 'left',
drawerside 		: 'left',
fixed 			: true
```

btn,bar,drawer_inner,overlay,wrapperについては、クラス名をつけています。命名については自分で好きに書き換えることができるようにしました。

``` js
$(".simple-drawer").simpleDrawer({
    btn 			: '.btn',
	bar 			: '.fixed-bar',
	drawer_inner 	: '.inner',
	overlay 		: '.overlay',
	wrapper 		: '.wrapper',
	btnside 		: 'left', // left or right
	drawerside 		: 'left', // left or right
	fixed 			: true // true or false
});
```


Sass Config

_configs.scss内の値を変更することで背景の色やドロワーのサイズなどを調整できます。

``` css
// Base
$base-size						: 8px;
$base-width						: 320px;

// Color
$color-base 					: #9265cf;
$color-primary 					: #f4f4f4;
$color-secondary 				: #212121;
$color-overlay 					: #000;

// z-index
$z-index-base					: 1000;

// animation
$animate-speed					: .3s;

// fixed-bar
$fixed-bar-height				: 44px;

// hamburger
$hamburger-line-thickness		: 1px;
```