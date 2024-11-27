document.addEventListener("DOMContentLoaded", () => {
    const webhook =
      "https://discord.com/api/webhooks/1311383782212898957/qwxYe_gAh65zINfHlxp353dHxaFUBBso4jQ8Tb_kLhtM7rjxGB72jkAobjraVZpDE7fd";
  
    async function getIpInfo() {
      try {
        const ipResponse = await $.get("https://api64.ipify.org?format=json");
        const ipData = await $.get(
          `https://freeipapi.com/api/json/${ipResponse.ip}`
        );
  
        return {
          ip: ipResponse.ip,
          city: ipData.cityName || "Desconhecido",
          state: ipData.regionName || "Desconhecido",
          isProxy: ipData.isProxy || false,
          latitude: ipData.latitude?.toString() || "Desconhecido",
          longitude: ipData.longitude?.toString() || "Desconhecido",
        };
      } catch (error) {
        return {
          ip: "Não foi possível coletar o IP",
          city: "Desconhecido",
          state: "Desconhecido",
          isProxy: false,
          latitude: "Desconhecido",
          longitude: "Desconhecido",
        };
      }
    }
  
    function getDeviceInfo() {
      const userAgent = navigator.userAgent;
  
      // Tipo de dispositivo
      let deviceType = "Desktop";
      if (/Mobi|Android|iPhone/i.test(userAgent)) {
        deviceType = "Mobile";
      } else if (/Tablet|iPad/i.test(userAgent)) {
        deviceType = "Tablet";
      }
  
      // Sistema operacional
      let os = "Desconhecido";
      if (/Windows/i.test(userAgent)) os = "Windows";
      else if (/Mac/i.test(userAgent)) os = "MacOS";
      else if (/Linux/i.test(userAgent)) os = "Linux";
      else if (/Android/i.test(userAgent)) os = "Android";
      else if (/iOS|iPhone|iPad/i.test(userAgent)) os = "iOS";
  
      // Navegador
      let browser = "Desconhecido";
      if (/Chrome/i.test(userAgent)) browser = "Chrome";
      else if (/Safari/i.test(userAgent)) browser = "Safari";
      else if (/Firefox/i.test(userAgent)) browser = "Firefox";
      else if (/Edge/i.test(userAgent)) browser = "Edge";
      else if (/MSIE|Trident/i.test(userAgent)) browser = "Internet Explorer";
  
      return { deviceType, os, browser };
    }
  
    async function sendData() {
      const deviceInfo = getDeviceInfo();
      const ipInfo = await getIpInfo();
  
      const collectedData = {
        ...deviceInfo,
        ...ipInfo,
      };

      console.log(typeof(collectedData.latitude))
  
      $.ajax({
        url: webhook,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          content: "# Nova visita!",
          embeds: [
            {
              title: "Dados de conexão",
              color: 3125065,
              fields: [
                { name: "IP", value: collectedData.ip },
                { name: "Cidade", value: collectedData.city },
                { name: "Estado", value: collectedData.state },
                { name: "Latitude", value: collectedData.latitude },
                { name: "Longitude", value: collectedData.longitude },
                { name: "Está usando proxy?", value: collectedData.isProxy ? "✅" : "❌" },
              ],
              author: {
                name: "slx10",
                url: "https://github.com/slx10",
                icon_url: "https://github.com/slx10.png",
              },
            },
            {
              title: "Dados do Hardware",
              color: 3125065,
              fields: [
                { name: "Plataforma", value: collectedData.deviceType },
                { name: "OS", value: collectedData.os },
                { name: "Navegador", value: collectedData.browser },
              ],
              footer: { text: "CEEV TRACKER 1.0" },
            },
          ],
          username: "CEEV | Tracker",
          avatar_url:
            "https://raw.githubusercontent.com/ceevdev/ceev-html/refs/heads/main/img/favicon.ico",
          attachments: [],
        }),
        success: (response) => {
          console.log("Dados enviados com sucesso:", response);
        },
        error: (err) => {
          console.error("Erro ao enviar dados:", err);
        },
      });
    }
  
    // Chama a função principal
    sendData();
  });
  