BlueMesh: Encrypted P2P Bluetooth Chat
BlueMesh is a serverless, browser-based chat system designed for secure communication in environments without internet access. It leverages the Web Bluetooth API to create a mesh-like connection between devices and the Web Crypto API for end-to-end encryption.

Features
Zero Backend: No servers, no databases, and no tracking. Everything happens device-to-device.

End-to-End Encryption: Uses ECDH (Elliptic Curve Diffie-Hellman) for key exchange and AES-GCM for message encryption.

Offline First: Built as a Progressive Web App (PWA). Once loaded, it works entirely offline.

Persistent History: Messages are stored locally on your device using IndexedDB.

Technical Architecture
The system is divided into four modular layers:

Transport Layer (ble.js): Manages GATT (Generic Attribute Profile) connections and characteristic notifications using the Web Bluetooth API.

Security Layer (crypto.js): Handles the cryptographic primitives. It generates ephemeral keys and encrypts/decrypts payloads.

Storage Layer (db.js): A lightweight wrapper around the browser's IndexedDB to save chat history.

Application Layer (app.js): The central controller that coordinates events between the UI, the radio, and the encryption engine.

How to Run
Access the Live App: Open the GitHub Pages link

Enable Bluetooth: Ensure your device's Bluetooth is turned on.

Pairing: Click "Connect Peer". Select a nearby device to initiate the handshake.

Chat: Once connected, the status indicator will turn green, and you can send encrypted messages.

Note: Web Bluetooth requires HTTPS and a User Gesture (like a button click) to function for security reasons.

Security Threat Model
Encryption: All data is encrypted before it leaves the device.

Deduplication: A flood-routing logic prevents message loops using unique Message IDs.

DDoS Protection: Minimal TTL (Time-to-Live) settings prevent old messages from congesting the "mesh."