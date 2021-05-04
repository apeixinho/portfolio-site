# My Portfolio Website

## How to run with _Docker_

-  To run _Docker_ with _Let's Encrypt_ for __Production Environment__ execute the following command:

    ```
    docker run -d \
        -e VIRTUAL_HOST=adolfo-peixinho.eu.org \
        -e LETSENCRYPT_HOST=adolfo-peixinho.eu.org,www.adolfo-peixinho.eu.org \
        -e LETSENCRYPT_EMAIL=a_peixinho@sapo.pt \
        --expose=10001 \
        --restart=on-failure:10 \
        --network=webproxy \
        --name portfolio-site \
        portfolio-site
    ```

-  To run _Docker_ with _Let's Encrypt_ for __Test Environment__ execute the following command:

    ```
    docker run -d \
        -e VIRTUAL_HOST=adolfo-peixinho.eu.org \
        -e LETSENCRYPT_HOST=adolfo-peixinho.eu.org,www.adolfo-peixinho.eu.org \
        -e LETSENCRYPT_EMAIL=a_peixinho@sapo.pt \
        -e LETSENCRYPT_TEST="true" \
        --expose=10001 \
        --restart=on-failure:10 \
        --network=webproxy \
        --name portfolio-site \
        portfolio-site
    ```

-  To run _Docker_ without _Let's Encrypt_ execute the following command:

    ```
    docker run -d \
        --expose=10001 \
        --restart=on-failure:10 \
        --network=webproxy \
        --name portfolio-site \
        portfolio-site
    ```

