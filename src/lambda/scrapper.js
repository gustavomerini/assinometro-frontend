const temp1 = document.getElementsByClassName('item card');
Array.from(temp1).map((teste) => {
    const content = teste.textContent.toLowerCase();

    const endChannel = content.indexOf("canais");
    const startChannel = endChannel - 3;
    const channelCount = Number(
      content.substring(startChannel, endChannel).trim()
    );

    const endDevice = content.indexOf("ponto");
    const startDevice = endDevice - 2;
    const deviceCount = Number(
      content.substring(startDevice, endDevice).trim()
    );

    const htmlContent = teste.innerHTML.toLowerCase();
    const startTitle = htmlContent.indexOf("title=") + 7;
    const endTitle = htmlContent.substring(startTitle).indexOf('"');
    const title = htmlContent.substring(startTitle, startTitle  + endTitle);

    const startMoney = content.indexOf('r$')
    const money = content.substring(startMoney, startMoney + 9);
    return {
      subscriptionName: title,
      ext: {
        channelCount,
        deviceCount,
      },
      price: money,
      type: "INTERNET",
      frequency: "MONTHLY",
      logo: title + ".png"
    };
  });
