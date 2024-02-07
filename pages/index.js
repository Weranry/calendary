import Lunar from 'lunar-javascript';

export default function Home({ solarDate, lunarDate, ganZhi, jieQi, wuHou, shuJiu, fu }) {
  return (
    <div>
      <div id="solarDate">{solarDate}</div>
      <div id="lunarDate">{lunarDate}</div>
      <div id="ganZhi">{ganZhi}</div>
      <div id="jieQi">{jieQi}</div>
      <div id="wuHou">{wuHou}</div>
      <div id="shuJiu">{shuJiu}</div>
      <div id="fu">{fu}</div>
    </div>
  );
}

export async function getServerSideProps() {
  const d = Solar.fromDate(new Date());
  const solarDate = `${d.getYear()}年${d.getMonth()}月${d.getDay()}日 星期${d.getWeekInChinese()}`;

  const lunar = Lunar.fromDate(new Date());
  const lunarDate = `${lunar.getMonthInChinese()}月${lunar.getDayInChinese()}`;
  const ganZhi = `${lunar.getYearInGanZhiExact()}年${lunar.getMonthInGanZhiExact()}月${lunar.getDayInGanZhi()}日`;
  const jieQi = lunar.getJieQi() || "当前无节气";
  const wuHou = lunar.getWuHou() || "当前无物候";
  const shuJiu = lunar.getShuJiu() ? lunar.getShuJiu().toFullString() : "不在数九期间";
  const fu = lunar.getFu() ? lunar.getFu().toFullString() : "不在伏天期间";

  return {
    props: {
      solarDate,
      lunarDate,
      ganZhi,
      jieQi,
      wuHou,
      shuJiu,
      fu,
    },
  };
}