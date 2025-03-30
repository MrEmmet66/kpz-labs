export class Authenticator {
    protected static instance: Authenticator;
    private users: Map<string, string>;
    protected currentUser: string | null;

    protected constructor() {
        this.users = new Map<string, string>();
        this.currentUser = null;
        console.log("Authenticator instance created");
        
        this.users.set("admin", "admin123");
        this.users.set("user1", "password1");
        this.users.set("user2", "password2");
    }

    public static getInstance(): Authenticator {
        if (!Authenticator.instance) {
            Authenticator.instance = new Authenticator();
        }
        return Authenticator.instance;
    }

    public login(username: string, password: string): boolean {
        if (this.users.has(username) && this.users.get(username) === password) {
            this.currentUser = username;
            return true;
        }
        return false;
    }

    public logout(): void {
        this.currentUser = null;
    }

    public getCurrentUser(): string | null {
        return this.currentUser;
    }

    public registerUser(username: string, password: string): boolean {
        if (this.users.has(username)) {
            return false;
        }
        
        this.users.set(username, password);
        return true;
    }

    public isAuthenticated(): boolean {
        return this.currentUser !== null;
    }
}

export class EnhancedAuthenticator extends Authenticator {
    public static getInstance(): EnhancedAuthenticator {
        if (!Authenticator.instance) {
            Authenticator.instance = new EnhancedAuthenticator();
        } 
        else if (!(Authenticator.instance instanceof EnhancedAuthenticator)) {
            console.warn("Warning: An Authenticator instance already exists. Cannot create EnhancedAuthenticator.");
            Authenticator.instance = new EnhancedAuthenticator();
        }
        
        return Authenticator.instance as EnhancedAuthenticator;
    }
    
    public static getInstanceInfo(): string {
        return "This is an enhanced authenticator, but it uses the same instance as the parent";
    }
    
    public loginWithToken(token: string): boolean {
        this.currentUser = token;
        return true;
    }
}
