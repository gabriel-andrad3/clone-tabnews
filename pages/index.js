// app/tempo/page.tsx (App Router) ou pages/tempo.js (Pages Router)
"use client"; // apenas no App Router
import { useEffect, useState } from "react";
import Image from "next/image";

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
    <div style={styles.container}>
      <div style={styles.content}>
        <Image
          src="/foto.jpg" // Coloque sua foto em /public/foto.jpg
          alt="Foto do casal"
          width={300}
          height={300}
          style={styles.image}
        />
        <h1 style={styles.text}>{tempo}</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#ffeef2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
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
  text: {
    fontSize: "1.2rem",
    marginTop: "20px",
    lineHeight: 1.6,
  },
};
