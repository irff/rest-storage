# rest-storage

[![Build Status](https://travis-ci.org/irff/rest-storage.svg?branch=master)](https://travis-ci.org/irff/rest-storage)

[![NPM](https://nodei.co/npm/rest-storage.png)](https://nodei.co/npm/rest-storage/)

Store any blocks of document through REST API

## Idea

REST-STORAGE adalah sebuah service yang memungkinkan klien untuk menyimpan blok-blok dokumen dalam bentuk JSON secara cepat dan mudah. Dokumen-dokumen akan disimpan dalam bentuk file pada disk (seperti SQLite), pada pengembangan selanjutnya akan tersedia juga opsi untuk menyimpan dokumen di dalam RAM (in-memory). Klien dapat melakukan operasi CRUD (Create-Read-Update-Delete) melalui REST API. Sebuah instansi deployment REST-STORAGE dapat dipakai oleh banyak klien sekaligus karena setiap dokumen akan memiliki prefix-key yang berupa ID dari pemiliknya.

## Aim
- Store blocks of documents in JSON
- REST API Access
- Multi-file storage
- Multi-tenant
- Hassle free installation

## How to Use
```
> npm install -g rest-storage
> rest-storage
```

## API Guide

### GET: mengakses data `[GET]`
Format request: `/get/:owner/:key`

### STORE: menyimpan data `[POST]`
Format request: `/store`
Dengan parameter: `{ owner: ‘nama-owner’, key: ‘nama-key’, value: ‘sebuah-value’}`

### REMOVE: menghapus sebuah data `[GET]`
Format request: `/remove/:owner/:key`

### CLEAR: mengosongkan storage seorang owner `[GET]`
Format request: `/clear/:owner`

### Developer Guide
```
> git clone https://github.com/irff/rest-storage
> npm install
> npm test
> node index.js
```

## Credits
This project is built using [simonlast/node-persist](https://github.com/simonlast/node-persist) as the storage engine.

## License
This project is built using MIT License 
