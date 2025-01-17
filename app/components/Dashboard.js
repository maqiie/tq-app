import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Print from "expo-print"; // For generating PDF
import { shareAsync } from "expo-sharing"; // To share PDF
import { BarChart } from "react-native-chart-kit";
// import DateTimePicker from '@react-native-community/datetimepicker';

const CashpointDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(-250));
  const [cashpointBalance, setCashpointBalance] = useState(12000);
  const [debts, setDebts] = useState(3000);
  const navigation = useNavigation(); // Use the navigation hook


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [agents, setAgents] = useState([
    {
      id: 1,
      name: "Agent A",
      balance: 3000,
      transactions: [{ date: "2025-01-01", amount: 1000 }],
    },
    {
      id: 2,
      name: "Agent B",
      balance: 4500,
      transactions: [{ date: "2025-01-02", amount: 1500 }],
    },
    {
      id: 3,
      name: "Agent C",
      balance: 1500,
      transactions: [{ date: "2025-01-03", amount: 500 }],
    },
  ]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  const toggleMenu = () => {
    const toValue = menuOpen ? -250 : 0;
    Animated.timing(menuAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(!menuOpen);
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
  };

  const downloadPDF = async (agent) => {
    const html = `
      <html>
      <body>
        <h1>${agent.name} Transactions</h1>
        <ul>
          ${agent.transactions
            .map(
              (transaction) =>
                `<li>${transaction.date}: $${transaction.amount.toFixed(
                  2
                )}</li>`
            )
            .join("")}
        </ul>
      </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Side Menu */}
      <Animated.View style={[styles.sideMenu, { left: menuAnimation }]}>
        <Text style={styles.menuHeader}>Menu</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Debtors')} // Using prop for navigation
        >
          <Text style={styles.menuItemText}>Debtors</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Employees')} // Using prop for navigation
        >
          <Text style={styles.menuItemText}>Employees</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Revenue')} // Using prop for navigation
        >
          <Text style={styles.menuItemText}>Revenue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('Settings')} // Using prop for navigation
        >
          <Text style={styles.menuItemText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => Alert.alert('Logout')} // Logout alert
        >
          <Text style={styles.menuItemText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
      {/* Overlay */}
      {menuOpen && (
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} />
      )}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleMenu}>
          <Text style={styles.hamburger}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Cashpoint Dashboard</Text>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>{greeting}, Welcome Back!</Text>
        <Text style={styles.greetingSubText}>
          Manage your cashpoint efficiently.
        </Text>
      </View>

      {/* Balance Section */}
      <View style={styles.balanceSection}>
        <Text style={styles.balanceTitle}>Total Balance</Text>
        <Text style={styles.balanceAmount}>${cashpointBalance.toFixed(2)}</Text>
        <Text style={styles.debtTitle}>Debtors</Text>
        <Text style={styles.debtAmount}>${debts.toFixed(2)}</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Agents</Text>
        {agents.map((agent) => (
          <TouchableOpacity
            key={agent.id}
            style={styles.agentCard}
            onPress={() => handleAgentClick(agent)}
          >
            <Text style={styles.agentName}>{agent.name}</Text>
            <Text style={styles.agentBalance}>
              Balance: ${agent.balance.toFixed(2)}
            </Text>
          </TouchableOpacity>
        ))}

        {selectedAgent && (
          <View style={styles.agentDetails}>
            <Text style={styles.detailsTitle}>
              {selectedAgent.name} Transactions
            </Text>

            {/* Date Picker for selecting duration */}
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateInputLabel}>Select Duration:</Text>

              {/* Start Date Picker */}
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowStartPicker(true)}
              >
                <Text style={styles.datePickerText}>
                  Start Date: {startDate.toISOString().split("T")[0]}
                </Text>
              </TouchableOpacity>
              {showStartPicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowStartPicker(false);
                    if (selectedDate) setStartDate(selectedDate);
                  }}
                />
              )}

              {/* End Date Picker */}
              <TouchableOpacity
                style={styles.datePickerButton}
                onPress={() => setShowEndPicker(true)}
              >
                <Text style={styles.datePickerText}>
                  End Date: {endDate.toISOString().split("T")[0]}
                </Text>
              </TouchableOpacity>
              {showEndPicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowEndPicker(false);
                    if (selectedDate) setEndDate(selectedDate);
                  }}
                />
              )}
            </View>

            {/* Transactions */}
            {selectedAgent.transactions.map((txn, index) => (
              <Text key={index} style={styles.transaction}>
                {txn.date}: ${txn.amount.toFixed(2)}
              </Text>
            ))}

            {/* Button to download PDF */}
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => downloadPDF(selectedAgent, startDate, endDate)}
            >
              <Text style={styles.downloadButtonText}>Download PDF</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Graph Section */}
        <Text style={styles.sectionTitle}>Agent Performance</Text>
        <BarChart
          data={{
            labels: agents.map((agent) => agent.name),
            datasets: [
              {
                data: agents.map((agent) => agent.balance),
              },
            ],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          chartConfig={{
            backgroundColor: "#1E293B",
            backgroundGradientFrom: "#1E293B",
            backgroundGradientTo: "#10B981",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={{ marginVertical: 20 }}
        />

        {/* Create Agent Section */}
        <Text style={styles.sectionTitle}>Create New Agent</Text>
        <TextInput
          style={styles.input}
          placeholder="Agent Name"
          placeholderTextColor="#6B7280"
        />
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Add Agent</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7", // Light background for a clean look
  },
  sideMenu: {
    position: "absolute",
    width: 250,
    height: "100%",
    backgroundColor: "#2D3748", // Darker shade for modern aesthetics
    padding: 20,
    zIndex: 10,
    borderRightWidth: 1,
    borderRightColor: "#4A5568", // Darker border color for subtle contrast
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10, // Softer shadow for a modern effect
    borderTopLeftRadius: 25, // More rounded corners for a sleek look
    borderBottomLeftRadius: 25,
  },

  menuHeader: {
    fontSize: 24, // Bigger font for prominence
    fontWeight: "800", // Stronger font weight for modern appeal
    color: "#EDF2F7", // Soft light color for readability
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#CBD5E0", // Lighter border for definition
    paddingBottom: 12,
    textAlign: "center",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginVertical: 8,
    borderRadius: 15, // Increased radius for a modern look
    borderWidth: 1,
    borderColor: "#4A5568", // Defined border color
    backgroundColor: "#374151", // A bit lighter for contrast
    transition: "background-color 0.3s",
  },

  menuItemText: {
    color: "#E2E8F0", // Softer text color for better readability
    fontSize: 18,
    marginLeft: 12,
    fontWeight: "600", // Slightly lighter font weight for elegance
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Lighter overlay for modern ambiance
    zIndex: 5,
    transition: "background-color 0.3s",
  },

  menuItemIcon: {
    fontSize: 22,
    color: "#E2E8F0", // Softer icon color for modern appeal
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#1A202C", // Dark background for modern contrast
  },

  hamburger: {
    color: "#FFFFFF",
    fontSize: 30,
    marginRight: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700", // Bolder text for modern appeal
  },

  greeting: {
    padding: 20,
    backgroundColor: "#38B2AC", // Refreshing teal for a modern look
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  greetingText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800", // Stronger font weight for visual hierarchy
  },

  greetingSubText: {
    color: "#F0FFF4", // Light contrast for subtext
    fontSize: 16,
    marginTop: 5,
  },

  balanceSection: {
    margin: 20,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 12, // More rounded for smoothness
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  balanceTitle: {
    fontSize: 16,
    color: "#4A5568", // Subtle gray for balance text
  },

  balanceAmount: {
    fontSize: 28,
    fontWeight: "700", // Bold amount text
    color: "#38B2AC", // Fresh teal for contrast
    marginVertical: 10,
  },

  debtTitle: {
    fontSize: 16,
    color: "#4A5568",
    marginTop: 20,
  },

  debtAmount: {
    fontSize: 22,
    fontWeight: "700", // Bolder debt amount
    color: "#E53E3E", // Bright red for high contrast
  },

  content: {
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700", // Bold title for sections
    color: "#2D3748", // Deep gray for section titles
    marginVertical: 12,
  },

  agentCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  agentName: {
    fontSize: 18,
    fontWeight: "700", // Strong agent name
    color: "#2D3748", // Dark color for visibility
  },

  agentBalance: {
    fontSize: 14,
    color: "#4A5568",
    marginTop: 5,
  },

  agentDetails: {
    marginVertical: 20,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  detailsTitle: {
    fontSize: 20,
    fontWeight: "700", // Bolder title
    color: "#2D3748",
    marginBottom: 12,
  },

  transaction: {
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 8,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  datePickerText: {
    fontSize: 16,
  },
  downloadButton: {
    backgroundColor: "#3182CE", // Modern blue for button
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 8, // Rounded corners for buttons
    alignItems: "center",
  },

  downloadButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  input: {
    backgroundColor: "#F3F4F6", // Light gray for inputs
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#2D3748", // Dark text for visibility
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0", // Subtle input border color
  },

  createButton: {
    backgroundColor: "#38B2AC", // Fresh teal for the create button
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default CashpointDashboard;
