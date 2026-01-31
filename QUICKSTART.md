# 🚀 FRONTEND QUICKSTART

## 1️⃣ Kurulum (30 Saniye)

```bash
cd frontend
npm install
```

## 2️⃣ Çalıştır (5 Saniye)

```bash
npm run dev
```

Tarayıcında aç: **http://localhost:3000**

## 3️⃣ Backend Bağlantısı

Backend'in çalıştığından emin ol:

```bash
# Başka bir terminal'de
cd backend
python run.py
```

## ✅ Hazır!

1. ✅ Frontend çalışıyor → http://localhost:3000
2. ✅ Backend çalışıyor → http://localhost:8000
3. ✅ Bir video linki yapıştır
4. ✅ "Video Bul" butonuna tıkla
5. ✅ "HEMEN İNDİR" ile indir!

## 🎨 Özellikler

- **Neon Input**: Link yapıştır, parlar ✨
- **Loading**: Havalı spinner döner 🔄
- **Video Card**: Thumbnail + bilgiler + dev buton 📹
- **Responsive**: Telefonda da mükemmel 📱
- **Dark Theme**: Gece mavisi + neon mor 🌙

## 🔧 Environment (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Production'da backend URL'ini değiştir!

## 📦 Build (Production)

```bash
npm run build
npm start
```

## 🚨 Sorun mu var?

### Backend'e bağlanamıyor?
```bash
# .env.local'i kontrol et
# Backend'in çalıştığını doğrula
curl http://localhost:8000/api/health
```

### Port meşgul?
```bash
PORT=3001 npm run dev
```

### Node modules hatası?
```bash
rm -rf node_modules package-lock.json
npm install
```

## 💡 Pro Tips

- **F12** ile DevTools aç, Network tab'ı izle
- **Toast notifications** hataları gösterir
- **TikTok** videoları watermark-free indirilir
- **Enter** tuşu ile de arayabilirsin

---

**Frontend hazır!** Backend ile birlikte kullan 🚀
