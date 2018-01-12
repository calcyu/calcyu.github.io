---
title: vagrant-install-config
tags: VAGRANT
---

## Install

First install [Vagrant](https://releases.hashicorp.com/vagrant/1.8.5/vagrant_1.8.5.msi) and [VirtualBox](http://download.virtualbox.org/virtualbox/5.1.6/VirtualBox-5.1.6-110634-Win.exe)

Open URL [www.vagrant.ex](http://www.vagrant.ex)

Download box [centos65-x86_64-20140116.box](https://github.com/2creatives/vagrant-centos/releases/download/v6.5.3/centos65-x86_64-20140116.box)
<!--more-->
## Configure

``` bash
vagrant box add geek5 centos65-x86_64-20140116.box
vagrant init geek5 
```
The Vagrantfile file is created in the current directory

Open Vagrantfile file

Set port

Remove the "#"

```
config.vm.network "forwarded_port", guest: 80, host: 8080  
config.vm.network "private_network", ip: "192.168.33.10"  
config.vm.synced_folder "./www", "/var/www/html"  
```
``` bash
vagrant up
```


## Issues
```
this kernel requires an x86-64 cpu but only detected an i686 cpu unable to boot please use a kernel appropriate for your cpu
Open Virtualization Technology in Bios

default: Warning: Authentication failure. Retrying...
Add configuration item in Vagrantfile file
```
``` bash
config.ssh.username = "vagrant"
config.ssh.password = "vagrant"
```

