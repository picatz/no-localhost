# no-localhost

In light of the recently announced [Zoom vulnerabilities](https://medium.com/@jonathan.leitschuh/zoom-zero-day-4-million-webcams-maybe-an-rce-just-get-them-to-visit-your-website-ac75c83f4ef5), this plugin aims to help identify and prevent access to `localhost` on any port.

## Installation

1. Clone this repository, so it exists locally: `$ git clone https://github.com/picatz/no-localhost.git`
2. In your browser, open the Extension Management page by navigating to [`chrome://extensions`](chrome://extensions) or by clicking on the Chrome menu, hovering over More Tools then selecting Extensions.
3. Enable Developer Mode by clicking the toggle switch next to Developer mode.
4. Click the LOAD UNPACKED button and select the extension directory (this repository, where it was cloned to).

### Other Mitigations

Disable video on the zoom client and remove the ZoomOpener process. This is arguably the best defense againt the Zoom client attack specifically:

```console
$ defaults write ~/Library/Preferences/us.zoom.config.plist ZDisableVideo 1
$ kill -9 $(lsof -i :19421 | grep -i zoom | awk '{ print $2 }')
$ rm -rf ~/.zoomus
$ touch ~/.zoomus
```

Block access to the localhost port using `pfctl`:

```console
$ echo "block drop quick on lo0 proto tcp from any to any port = 19421" | sudo pfctl -e -f -
```
