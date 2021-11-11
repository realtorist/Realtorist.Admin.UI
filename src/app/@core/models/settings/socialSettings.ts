export interface SocialSettings {
    socialNetworks: SocialNetworkLink[];
}

export interface SocialNetworkLink {
    socialNetwork: SocialNetwork;
    url: string;
}

export enum SocialNetwork {
    Facebook = 0,
    Instagram = 1,
    Twitter = 2,
    LinkedIn = 3
}