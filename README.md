sysinfo
=======

System Information base on Chrome system javascript API

=======
#### Used API

| Name          | Description                   | Since |
|---------------|-------------------------------|:-----:|
| system.cpu    | [query CPU metadata](https://developer.chrome.com/apps/system.cpu)            | 32    |
| system.memory | [query memory info](https://developer.chrome.com/apps/system.memory)          | 32    |
| system.storage| [query storage device info](https://developer.chrome.com/apps/system.storage) | 30    |
| system.display| [query display metadata](https://developer.chrome.com/apps/system.display)    | 30    |
| system.network| [query network device info](https://developer.chrome.com/apps/system.network) | 33    |

=======
#### Screenshots

| Windows    | Ubuntu     | Mac        |
|:----------:|:----------:|:----------:|
| ![windows](assets/windows.png) | ![ubuntu](assets/ubuntu.png) | ![mac](assets/mac.png) |


| Android    | Chrome OS  |
|:----------:|:----------:|
| ![android](assets/android.png) | ![chromeos](assets/chromeos.jpg) |


=======
#### Howto
On Windows/Ubuntu/Mac with Chrome browser, go to **chrome://extensions**, press **Load unpacked extension...** button, then load this project folder.

On Android, use [Chrome Dev Editor](https://github.com/dart-lang/chromedeveditor) to open this project, then deploy to mobile.

-enjoy

