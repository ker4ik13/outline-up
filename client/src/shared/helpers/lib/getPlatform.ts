const userDevices = [
  { device: "Android", platform: /Android/ },
  { device: "iPhone", platform: /iPhone/ },
  { device: "iPad", platform: /iPad/ },
  { device: "Symbian", platform: /Symbian/ },
  { device: "Windows Phone", platform: /Windows Phone/ },
  { device: "Tablet OS", platform: /Tablet OS/ },
  { device: "Linux", platform: /Linux/ },
  { device: "Windows", platform: /Windows NT/ },
  { device: "Macintosh", platform: /Macintosh/ },
];

export const getUserPlatform = (userAgent: string) => {
  for (let i in userDevices) {
    if (userDevices[i].platform.test(userAgent)) {
      return userDevices[i].device;
    }
  }
  return "Неизвестная платформа!" + userAgent;
};
