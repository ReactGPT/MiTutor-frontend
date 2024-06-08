export type User = {
    id: number;
    institutionalEmail: string;
    pucpCode: string;
    isActive: boolean;
    persona: {
        id: number;
        name: string;
        lastName: string;
        secondLastName: string;
        phone: string;
        isActive: boolean;
    };
    roles: any[] | null;
    isVerified: boolean;
};