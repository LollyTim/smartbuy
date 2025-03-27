// Define wallet API types based on CIP-30 specification
export interface CardanoWallet {
  enable: () => Promise<WalletAPI>;
  isEnabled: () => Promise<boolean>;
  apiVersion: string;
  name: string;
  icon: string;
}

export interface WalletAPI {
  getNetworkId: () => Promise<number>;
  getUtxos: () => Promise<string[] | undefined>;
  getBalance: () => Promise<string>;
  getUsedAddresses: () => Promise<string[]>;
  getUnusedAddresses: () => Promise<string[]>;
  getChangeAddress: () => Promise<string>;
  getRewardAddresses: () => Promise<string[]>;
  signTx: (tx: string, partialSign: boolean) => Promise<string>;
  signData: (
    addr: string,
    payload: string
  ) => Promise<{ signature: string; key: string }>;
  submitTx: (tx: string) => Promise<string>;
  getCollateral: () => Promise<string[] | undefined>;
}

declare global {
  interface Window {
    cardano?: {
      [key: string]: CardanoWallet;
    };
  }
}

// Get available wallets
export const getAvailableWallets = (): string[] => {
  if (typeof window === "undefined") {
    console.log("🔍 getAvailableWallets: Running on server side");
    return [];
  }

  const wallets: string[] = [];
  console.log(
    "🔍 getAvailableWallets: Checking window.cardano object:",
    window.cardano
  );

  if (window.cardano) {
    for (const walletName in window.cardano) {
      console.log("🔍 getAvailableWallets: Found wallet:", walletName);
      wallets.push(walletName);
    }
  } else {
    console.log("🔍 getAvailableWallets: No cardano object found in window");
  }
  return wallets;
};

// Update the connectCardanoWallet function to be more robust
export const connectCardanoWallet = async (
  walletName: string
): Promise<WalletAPI | null> => {
  console.log(
    "🚀 connectCardanoWallet: Starting connection process for wallet:",
    walletName
  );

  try {
    if (typeof window === "undefined") {
      console.log("❌ connectCardanoWallet: Running on server side");
      throw new Error("Wallet connection is only available in the browser");
    }

    // Validate wallet name
    if (!walletName || typeof walletName !== "string") {
      console.log(
        "❌ connectCardanoWallet: Invalid wallet name provided:",
        walletName
      );
      throw new Error("Invalid wallet name provided");
    }

    // Check if cardano object exists
    if (!window.cardano) {
      console.log("❌ connectCardanoWallet: No cardano object found in window");
      throw new Error(
        "No Cardano wallet detected. Please install a supported wallet like Lace, Eternl, or Nami from their official websites."
      );
    }

    console.log(
      "🔍 connectCardanoWallet: Available wallets:",
      Object.keys(window.cardano)
    );

    // Normalize wallet name for case-insensitive comparison
    const normalizedWalletName = walletName.toLowerCase().trim();
    const availableWallets = Object.keys(window.cardano);
    const matchingWallet = availableWallets.find(
      (w) => w.toLowerCase() === normalizedWalletName
    );

    console.log("🔍 connectCardanoWallet: Looking for wallet:", {
      requested: walletName,
      normalized: normalizedWalletName,
      found: matchingWallet,
    });

    if (!matchingWallet) {
      const supportedWallets = ["lace", "eternl", "nami"];
      const isSupportedWallet = supportedWallets.includes(normalizedWalletName);

      console.log("❌ connectCardanoWallet: Wallet not found", {
        isSupportedWallet,
        supportedWallets,
      });

      if (isSupportedWallet) {
        throw new Error(
          `${walletName} wallet is not installed. Please install it from the official website to continue.`
        );
      } else {
        throw new Error(
          `${walletName} is not a supported wallet. Please use one of: ${supportedWallets.join(
            ", "
          )}`
        );
      }
    }

    const wallet = window.cardano[matchingWallet];
    console.log("✅ connectCardanoWallet: Found wallet object:", {
      name: wallet.name,
      apiVersion: wallet.apiVersion,
    });

    // Check if wallet is already enabled
    const isEnabled = await wallet.isEnabled();
    console.log("🔍 connectCardanoWallet: Wallet enabled status:", isEnabled);

    let walletAPI: WalletAPI;
    if (isEnabled) {
      console.log("✅ connectCardanoWallet: Wallet already enabled");
      // If wallet is already enabled, we need to get the API again
      walletAPI = await wallet.enable();
    } else {
      console.log("🔄 connectCardanoWallet: Enabling wallet...");
      // Add timeout to prevent hanging
      const walletAPIPromise = wallet.enable();
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(
          () =>
            reject(new Error("Wallet connection timed out. Please try again.")),
          10000
        );
      });

      // Race the wallet connection against a timeout
      walletAPI = (await Promise.race([
        walletAPIPromise,
        timeoutPromise,
      ])) as WalletAPI;
    }

    // Validate the wallet API
    if (!walletAPI || typeof walletAPI.getChangeAddress !== "function") {
      throw new Error("Invalid wallet API received");
    }

    console.log("✅ connectCardanoWallet: Successfully connected to wallet");
    return walletAPI;
  } catch (error) {
    console.error(
      "❌ connectCardanoWallet: Error connecting to wallet:",
      error
    );
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to connect wallet. Please try again.");
  }
};

// Keep the original function name for backward compatibility but make it call the renamed function
export const connectWallet = connectCardanoWallet;

// Update the getWalletAddress function to handle network checks more gracefully
export const getWalletAddress = async (
  walletAPI: WalletAPI
): Promise<string> => {
  try {
    if (!walletAPI || typeof walletAPI.getChangeAddress !== "function") {
      throw new Error("Invalid wallet API");
    }

    // Get the network ID
    const networkId = await walletAPI.getNetworkId();
    console.log("Network ID:", networkId);

    // Get the address first
    const addressHex = await walletAPI.getChangeAddress();
    if (!addressHex || typeof addressHex !== "string") {
      throw new Error("Invalid address received from wallet");
    }

    // Return the address even if not on preview network
    // The network check will be handled at the UI level
    return addressHex;
  } catch (error) {
    console.error("Error getting wallet address:", error);
    throw error;
  }
};

// Update the getWalletBalance function to handle network checks more gracefully
export const getWalletBalance = async (
  walletAPI: WalletAPI
): Promise<number> => {
  try {
    if (!walletAPI || typeof walletAPI.getBalance !== "function") {
      throw new Error("Invalid wallet API");
    }

    // Get the network ID
    const networkId = await walletAPI.getNetworkId();
    console.log("Network ID:", networkId);

    const balanceHex = await walletAPI.getBalance();
    if (!balanceHex || typeof balanceHex !== "string") {
      throw new Error("Invalid balance received from wallet");
    }

    // Convert hex to decimal and divide by 1,000,000 to get ADA
    const lovelace = parseInt(balanceHex, 16);
    return lovelace / 1000000;
  } catch (error) {
    console.error("Error getting wallet balance:", error);
    throw error;
  }
};

// Add a new function to check network
export const checkNetwork = async (walletAPI: WalletAPI): Promise<boolean> => {
  try {
    if (!walletAPI || typeof walletAPI.getNetworkId !== "function") {
      throw new Error("Invalid wallet API");
    }

    const networkId = await walletAPI.getNetworkId();
    console.log("Checking network ID:", networkId);

    // 1 is preview network, 0 is testnet, 2 is mainnet
    return networkId === 1;
  } catch (error) {
    console.error("Error checking network:", error);
    return false;
  }
};

// Update the getTransactionHistory function to handle network checks more gracefully
export const getTransactionHistory = async (
  walletAPI: WalletAPI,
  address: string
): Promise<
  Array<{
    hash: string;
    amount: number;
    type: "sent" | "received";
    timestamp: number;
  }>
> => {
  try {
    if (!walletAPI || typeof walletAPI.getUtxos !== "function") {
      throw new Error("Invalid wallet API");
    }

    // Get the network ID
    const networkId = await walletAPI.getNetworkId();
    console.log("Network ID:", networkId);

    // Get UTXOs for the address
    const utxos = await walletAPI.getUtxos();
    if (!utxos) {
      return [];
    }

    // In a real implementation, you would:
    // 1. Use Blockfrost API to get transaction history
    // 2. Parse the transactions to determine sent/received amounts
    // 3. Get timestamps for each transaction
    // For now, we'll return a mock transaction history
    return [
      {
        hash: "tx1...",
        amount: 10,
        type: "received",
        timestamp: Date.now() - 86400000,
      },
      {
        hash: "tx2...",
        amount: 5,
        type: "sent",
        timestamp: Date.now() - 172800000,
      },
    ];
  } catch (error) {
    console.error("Error getting transaction history:", error);
    throw error;
  }
};

// Update the subscribeToBalanceUpdates function to handle network checks more gracefully
export const subscribeToBalanceUpdates = async (
  walletAPI: WalletAPI,
  callback: (balance: number) => void
): Promise<() => void> => {
  try {
    if (!walletAPI || typeof walletAPI.getBalance !== "function") {
      throw new Error("Invalid wallet API");
    }

    // Get the network ID
    const networkId = await walletAPI.getNetworkId();
    console.log("Network ID:", networkId);

    // Set up an interval to check balance every 30 seconds
    const interval = setInterval(async () => {
      try {
        const balanceHex = await walletAPI.getBalance();
        if (balanceHex) {
          const lovelace = parseInt(balanceHex, 16);
          callback(lovelace / 1000000);
        }
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    }, 30000);

    // Return cleanup function
    return () => clearInterval(interval);
  } catch (error) {
    console.error("Error setting up balance subscription:", error);
    throw error;
  }
};
