import unitsData from "../data/age-of-empires-units.json";

export default function getUnitsData() {
  return unitsData.units || [];
}
