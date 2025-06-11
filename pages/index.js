// pages/tempo.js (ou app/tempo/page.tsx se for App Router)
"use client"; // Somente se for App Router
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function TempoJuntos() {
  const [tempo, setTempo] = useState("Calculando...");

  useEffect(() => {
    const startDate = new Date("2023-10-29T16:00:00-03:00");

    const updateTimer = () => {
      const now = new Date();
      let diff = now.getTime() - startDate.getTime();

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let day = now.getDate() - startDate.getDate();

      if (day < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        day += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      const hoursR = hours % 24;
      const minutesR = minutes % 60;
      const secondsR = seconds % 60;

      setTempo(
        `Juntos há ${years} ano${years !== 1 ? "s" : ""}, ${months} m${months !== 1 ? "eses" : "ês"}, ` +
          `${day} dia${day !== 1 ? "s" : ""}, ${hoursR} hora${hoursR !== 1 ? "s" : ""}, ` +
          `${minutesR} minuto${minutesR !== 1 ? "s" : ""} e ${secondsR} segundo${secondsR !== 1 ? "s" : ""}`,
      );
    };

    const interval = setInterval(updateTimer, 1000);
    updateTimer();
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Nosso Amor</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Quicksand:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={styles.container}>
        <div className="hearts" />
        <div style={styles.content}>
          <Image
            src="/foto.jpg"
            alt="Foto do casal"
            width={300}
            height={300}
            style={styles.image}
          />
          <h1 style={styles.title}>Nosso Amor 💖</h1>
          <p style={styles.text}>{tempo}</p>
        </div>

        <style jsx>{`
          .hearts::before,
          .hearts::after {
            content: "💗";
            position: fixed;
            font-size: 24px;
            animation: float 6s linear infinite;
            bottom: -20px;
            opacity: 0;
          }

          .hearts::before {
            left: 20%;
            animation-delay: 0s;
          }

          .hearts::after {
            left: 80%;
            animation-delay: 2s;
          }

          @keyframes float {
            0% {
              bottom: -20px;
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
            100% {
              bottom: 100vh;
              opacity: 0;
            }
          }
        `}</style>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #ffeef2, #fff0f5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    position: "relative",
    overflow: "hidden",
  },
  content: {
    maxWidth: "90%",
    textAlign: "center",
    color: "#d6336c",
  },
  image: {
    borderRadius: "20px",
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    width: "100%",
    height: "auto",
    maxWidth: "300px",
  },
  title: {
    fontFamily: "'Great Vibes', cursive",
    fontSize: "2.5rem",
    marginTop: "20px",
  },
  text: {
    fontFamily: "'Quicksand', sans-serif",
    fontSize: "1.2rem",
    marginTop: "10px",
    lineHeight: 1.6,
  },
};
