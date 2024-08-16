import { Emote } from "./emote";

export class Element {
    public static PHYSICAL = new Element("200", "Physical", Emote.PHYSICAL_ICON);
    public static FIRE = new Element("201", "Fire", Emote.FIRE_ICON);
    public static ICE = new Element("202", "Ice", Emote.ICE_ICON);
    public static ELECTRIC = new Element("203", "Electric", Emote.ELECTRIC_ICON);
    public static ETHER = new Element("205", "Ether", Emote.ETHER_ICON);

    public static UNKNOWN = new Element(null, "No Data", Emote.UNKNOWN_ICON);

    private constructor(
        public id: string | null,
        public element: string,
        public emote: Emote,
    ) {
    }

    public static GetElementFromId(id: string | null | undefined): Element {
        switch(id) {
            case "200":
                return Element.PHYSICAL;

            case "201":
                return Element.FIRE;

            case "202":
                return Element.ICE;

            case "203":
                return Element.ELECTRIC;

            case "205":
                return Element.ETHER;

            default:
                return Element.UNKNOWN;
        }
    }
}