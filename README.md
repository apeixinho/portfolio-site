# My Portfolio Website

This site is setup to run on [nginx proxy automation](https://github.com/evertramos/nginx-proxy-automation).


All _nginx_, _Let's Encrypt_ _proxy automation_ credit goes to [these folks](https://github.com/evertramos/nginx-proxy-automation/graphs/contributors).
## How to run with _Docker_

-  To run _Docker_ with _Let's Encrypt_ for __Production Environment__ execute the following command:

    ```
    docker run -d \
        -e VIRTUAL_HOST=your-domain.org \
        -e LETSENCRYPT_HOST=your-domain.org \
        -e LETSENCRYPT_EMAIL=name@domain.org \
        --expose=10001 \
        --restart=on-failure:10 \
        --network=webproxy \
        --name portfolio-site \
        portfolio-site
    ```

-  To run _Docker_ with _Let's Encrypt_ for __Test Environment__ execute the following command:

    ```
    docker run -d \
        -e VIRTUAL_HOST=your-domain.org \
        -e LETSENCRYPT_HOST=your-domain.org \
        -e LETSENCRYPT_EMAIL=name@domain.org \
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

