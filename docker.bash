sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0
systemctl --user stop docker-desktop
systemctl --user start docker-desktop