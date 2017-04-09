Vagrant.configure("2") do |config|
  config.vm.box = "bento/centos-7.1"
  config.vm.network "private_network", ip: "192.168.33.10"
  config.vm.provision "ansible_local" do |ansible|
    ansible.playbook = "./ansible_local_env/playbook.yml"
    ansible.inventory_path = "./ansible_local_env/hosts"
    ansible.limit = "targets"
  end
end
