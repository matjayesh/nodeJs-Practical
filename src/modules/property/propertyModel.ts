import {
    IsEnum, IsNotEmpty,
} from "class-validator";
import { Constants } from "../../config/constants";
import { Model } from "../../model";

export class PropertyModel extends Model {

    @IsNotEmpty({ message: "ERR_PROPERTY_NAME_REQUIRED" })
    public name: string;

    @IsNotEmpty({ message: "ERR_PROPERTY_DESCRIPTION_REQUIRED" })
    public description: string;

    @IsNotEmpty({ message: "ERR_PROPERTY_ADDRESS_REQUIRED" })
    public address: string;

    @IsNotEmpty({ message: "ERR_PROPERTY_LOCALITY_REQUIRED" })
    public locality: string;

    @IsNotEmpty({ message: "ERR_PROPERTY_PRICE_REQUIRED" })
    public price: number;

    @IsNotEmpty({ message: "ERR_PROPERTY_BEDROOM_REQUIRED" })
    public bedroom: number;

    @IsNotEmpty({ message: "ERR_PROPERTY_BATH_REQUIRED" })
    public bath: number;

    @IsNotEmpty({ message: "ERR_PROPERTY_CARPET_UNIT_REQUIRED" })
    @IsEnum([Constants.CARPET_UNIT.SQ_FT, Constants.CARPET_UNIT.SQ_MT, Constants.CARPET_UNIT.SQ_YD])
    public areaUnit: string;

    @IsNotEmpty({ message: "ERR_PROPERTY_CARPET_AREA_REQUIRED" })
    public carpetArea: number;

    constructor(body: any) {
        super();
        this.name = body.name;
        this.description = body.description;
        this.address = body.address;
        this.locality = body.locality;
        this.price = body.price;
        this.bedroom = body.bedroom;
        this.bath = body.bath;
        this.areaUnit = body.areaUnit;
        this.carpetArea = body.carpetArea;
    }
}
