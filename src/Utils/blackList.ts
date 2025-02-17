const blacklistedTokens = new Set<string>();

export const isTokenBlacklisted = async (token: string): Promise<boolean> => {
    console.log("🔍 Vérification du token blacklisté :", token);
    return blacklistedTokens.has(token);
};

export const blacklistToken = async (token: string): Promise<void> => {
    console.log("🚨 Ajout du token à la blacklist :", token);
    blacklistedTokens.add(token);
};
