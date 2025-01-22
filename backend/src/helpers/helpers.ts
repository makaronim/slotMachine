import * as bcrypt from 'bcrypt';

export class Helpers {

    static async hashPassword(password: string): Promise<string> {
        const saltOrRounds = await bcrypt.genSalt();
        return await bcrypt.hash(password, saltOrRounds);
    }

    static async isPasswordMatch(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    static async rollLogic(credits: number) {
        //Define symbols and rewards
        let rewards: number = 0;
        const symbols: string[] = ['C', 'L', 'O', 'W'];
        const winRewards: Record<string, number> = {
            C: 10, // Cherry
            L: 20, // Lemon
            O: 30, // Orange
            W: 40, // Watermelon
        };
        const roll = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
        ];
        const houseRoll: string[] = await this.houseRoll(symbols);

        const isWinning = roll[0] === roll[1] && roll[1] === roll[2];
        if (credits >= 40 && credits <= 60 && isWinning && Math.random() < 0.3) {
            roll[0] = houseRoll[0]; // Re-roll first slot
        } else if (credits > 60 && isWinning && Math.random() < 0.6) {
            roll[0] = houseRoll[0]; // Re-roll first slot
        }
        if (isWinning) {
            rewards = winRewards[roll[0]];
        }
        return {rewards: rewards, symbols: roll};
    }

    static async houseRoll(symbols: string[]): Promise<string[]> {
        return [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
        ]
    }

}
