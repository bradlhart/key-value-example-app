FROM ubuntu:18.04
WORKDIR /root

RUN yes | unminimize \
 && apt-get update \
 && apt-get install -yq \
     build-essential \
     clang-tools-8 \
     curl \
     g++-8 \
     git \
     libcurl4-gnutls-dev \
     libgflags-dev \
     libgmp3-dev \
     libssl-dev \
     libusb-1.0-0-dev \
     sudo \
 && update-alternatives --remove-all cc \
 && update-alternatives --install /usr/bin/cc cc /usr/bin/gcc-8 100 \
 && update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-8 100 \
 && update-alternatives --remove-all c++ \
 && update-alternatives --install /usr/bin/c++ c++ /usr/bin/g++-8 100 \
 && update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-8 100 \
 && update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-8 100

RUN curl -sL https://deb.nodesource.com/setup_15.x | bash - \
 && apt-get install -yq \
     nodejs \
 && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* \
 && npm i -g yarn typescript

RUN mkdir -p "/opt/eosio/bin/contracts"
COPY ./ /opt/eosio/bin/

RUN curl -LO https://cmake.org/files/v3.19/cmake-3.19.0.tar.gz \
 && tar -xzf cmake-3.19.0.tar.gz \
 && cd cmake-3.19.0 \
 && ./bootstrap --prefix=/usr/local \
 && make -j8 \
 && make install \
 && rm -rf cmake-3.19.0.tar.gz cmake-3.19.0

RUN git clone https://github.com/EOSIO/eos \
 && cd eos \
 && git checkout release/2.2.x \
 && mkdir -p /opt/eosio/bin/contracts/eosio.bios/ && mv ./contracts/contracts/eosio.bios/bin/* /opt/eosio/bin/contracts/eosio.bios/ \
 && mkdir -p /opt/eosio/bin/contracts/eosio.boot/ && mv ./contracts/contracts/eosio.boot/bin/* /opt/eosio/bin/contracts/eosio.boot/

RUN apt-get update \
 && sudo apt-get install -y /opt/eosio/bin/binaries/eosio_2.2.0-rc1_amd64.deb \
 && rm /opt/eosio/bin/binaries/eosio_2.2.0-rc1_amd64.deb

RUN apt-get update \
 && sudo apt-get install -y /opt/eosio/bin/binaries/eosio.cdt_1.8.1-1_amd64.deb \
 && rm /opt/eosio/bin/binaries/eosio.cdt_1.8.1-1_amd64.deb

RUN mkdir -p "/opt/eosio/bin/config-dir"
RUN /bin/bash /opt/eosio/bin/scripts/deploy_contracts.sh
