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
