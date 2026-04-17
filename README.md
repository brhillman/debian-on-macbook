# debian-on-macbook
Notes on configuring a minimal debian install on a 2011 Macbook Air 11" laptop

## Install
  - Used amd64 netinst iso for minimal install environment, installing packages over ethernet connection.
  - UEFI install (no legacy BIOS, no dual boot)
  - Minimal install (only base system, no desktop environment)
  - Install xorg, openbox, xinit via apt after install
## Post-install base setup
```
sudo apt update
sudo apt install xorg xinit openbox dmenu xterm firefox-esr
```

### X + openbox configuration
Edit `.xinitrc` and add the following:
```
xrdb -merge ~/.Xresources
exec openbox-session
```
Edit `~/.config/openbox/rc.html` and add the following to the `<keyboard>` section:
```
  <keybind key="W-space">
    <action name="Execute">
      <command>dmenu_run</command>
    </action>
  </keybind>
 
  <keybind key="W-Tab">
    <action name="NextWindow"/>
  </keybind>
 
  <keybind key="W-S-Tab">
    <action name="PreviousWindow"/>
  </keybind>
```
then apply changes:
```
openbox --reconfigure
```

### Xterm configuration for fonts and copy and paste
Edit `~/.Xresources`:
```
XTerm*faceName: Monospace
XTerm*faceSize: 16
XTerm*selectToClipboard: true
XTerm*VT100.translations: #override \
    Ctrl Shift <Key>C: copy-selection(CLIPBOARD) \n\
    Ctrl Shift <Key>V: insert-selection(CLIPBOARD)
```
and apply changes:
```
xrdb -merge ~/.Xresources
```

### Firefox installation and tuning
Install firefox:
```
sudo apt install firefox-esr
```
We will create a dedicated low-memory profile. First, initialize a profile:
```
firefox-esr -P
```
and name the profile something appropriate (I used `tinyfox`). Now, create a `user.js` profile optimized for low memory pressure. Create `~/.mozilla/firefox/<profile name>/user.js` (https://github.com/brhillman/tinycore-on-macbook/blob/main/user.js). Open firefox and make sure it is configured to use this profile by default. Then, install `uBlock Origin` for ad blocking.

### Optional: swap/zram
Recommended for stability:
```
sudo apt install zram-tools
```
(I have not done this explicitly yet).

### Yubikey PIV setup
Install dependencies:
```
sudo apt install pcscd pcsc-tools opensc
```
Enable smart card daemon:
```
sudo systemctl enable pcscd
sudo systemctl start pcscd
```
Verify yubikey detection
```
pcsc_scan
```
List PIV certificates:
```
pkcs11-tool --module /usr/lib/x86_64-linux-gnu/opensc-pkcs11.so -L
```
(Note: this may be incomplete, getting PIV working was a bit of a hackfest)

### Omnissa horizon client
Omnissa Horizon Client was install from the .deb package provided by Omnissa. There was an issue with smartcard authentication in Omnissa though, where the bundled libcrypto is 3.4, but the system opensc was build against 3.5. The fix for this was to rebuild a version of opensc against the Omnissa bundled libcrypto:
```
# Install build dependencies
sudo apt install build-essential pkg-config libpcsclite-dev autoconf automake libtool

# Download OpenSC source
cd /tmp
wget https://github.com/OpenSC/OpenSC/releases/download/0.26.0/opensc-0.26.0.tar.gz
tar xzf opensc-0.26.0.tar.gz
cd opensc-0.26.0

# Build against Horizon's bundled OpenSSL 3.4.0
PKG_CONFIG_PATH=/usr/lib/omnissa \
LDFLAGS="-L/usr/lib/omnissa -Wl,-rpath,/usr/lib/omnissa" \
CPPFLAGS="-I/usr/include" \
./configure --prefix=/opt/opensc-horizon

make
sudo make install

# Replace the symlink with the custom-built version
sudo ln -sf /opt/opensc-horizon/lib/opensc-pkcs11.so /usr/lib/omnissa/horizon/pkcs11/libopensc-pkcs11.so

# Update library cache
sudo ldconfig
```
Clean up old symbolic links in `/usr/lib/omnissa/horizon/pkcs11/`.

## Use notes

### Setup screen locking
Use `slock`. Just type `slock` in a terminal to lock the screen (or enter `slock` in `dmenu`). To unlock, type user password. Note that there will be no visual feedback while typing, other than screen color changes as follows:

  - Black screen = locked, waiting for password input
  - Blue screen = you pressed Enter with an incorrect password
  - Red screen = you pressed Escape/Ctrl+U (clears the current input)

### Setup suspend/sleep
To suspend:
```
systemctl suspend
```
Can also add an alias to this in `~/.bashrc` if one is so inclined. Note that suspend on lid close worked out of the box for me.

### Check battery

### Check temperature

### Lock screen

### Suspend/sleep
