/*
 * Author: Antreas Lamprou (G21070510)
 * Email: ALambrou1@uclan.ac.uk
 * Description: The program prints a menu to the user with some options and until the user ends the program, the program will do the operations available at the menu.
 * To run the program: java DeckOfCards
 */

import java.util.Scanner;

public class DeckOfCards
{
    public static void main(String[] args)
    {
        int num;
        String [] suit = { "Clubs", "Diamonds", "Hearts", "Spades" }; //creates array 
        String [] rank = { "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King" }; //creates array 
        String [] deck = new String[52]; // create the deck [Week 7, Page 25]
        for(int i = 0; i < 13; i++) // initialize [Week 7, Page 25]
        {
            for(int j = 0; j < 4; j++)
            {
                deck[4*i + j] = rank[i] + " of " + suit[j];
            }
        }
        int RANKS = rank.length; //helps avoid hardcoded constants [Week 7, page 30]
        int SUITS = suit.length;
        int N = SUITS * RANKS;
        while (true) //runs infinitive while conditions are met
        {
            System.out.print("\n========================================= \n\tDECK OF CARDS - Main Menu \n========================================= \n \t> 1 to Shuffle the cards \n \t> 2 to Order the cards \n \t> 3 to Randomly pick 1 face card \n \t> 4 to Randomly pick 1 number card \n \t> 0 to Exit \nChoose the operation you want to perform: ");
            Scanner a = new Scanner(System.in); //promts user for input
            while (a.hasNextInt() == false) //checks if the input is number else p[romts the user for valid answer
            {
                System.out.println("\n*** Please provide a valid number (0-4) *** ");
                System.out.print("\n========================================= \n\tDECK OF CARDS - Main Menu \n========================================= \n \t> 1 to Shuffle the cards \n \t> 2 to Order the cards \n \t> 3 to Randomly pick 1 face card \n \t> 4 to Randomly pick 1 number card \n \t> 0 to Exit \nChoose the operation you want to perform: ");
                a = new Scanner(System.in);
            }
            num = a.nextInt(); //declares variable with the users input
            switch (num)
            {
                case 0:
                    System.out.println("[******************************************] \n[The harder your work, the Luckier you get!] \n[******************************************]");
                    System.exit(0); //ends program
                    break;
                case 1: // Shuffle deck [Week 7, Page 26]
                    for(int i = 0; i < 52; i++)
                    {
                        int r = i + (int) (Math.random() * (N-i)); // find a random position
                        String t = deck[r]; // swap idiom
                        deck[r] = deck[i];
                        deck[i] = t;
                    }
                    System.out.println("\n>>>>>>>>>>SHUFFLED DECK<<<<<<<<<<:");
                    for (int i = 0; i < 52; i++) // loop to print shuffled deck [Week 7, page 30]
                    {
                        System.out.println(deck[i]);
                    }
                    break;
                case 2:
                    for(int i = 0; i < 13; i++) // orders deck back to its usual order [Week 7, Page 25]
                    {
                        for(int j = 0; j < 4; j++)
                        {
                            deck[4*i + j] = rank[i] + " of " + suit[j];
                        }
                    }
                    for (int i = 0; i < 52; i++) // loop to print ordered deck
                    {
                        System.out.println(deck[i]);
                    }
                    break;
                case 3:
                    // print a random card by picking a random suit and a random rank from face cards 
                    int j = (int) (Math.random() * 4); // between 0 and 3 for suits 
                    int i = 10 + (int) (Math.random() * 3); // between 10 and 12 for ranks
                    System.out.println("\n>>>>>>>>>>Your random FACE card is: " + rank[i] + " of " + suit[j]);
                    break;
                case 4:
                    // print a random card by picking a random suit and a random rank from number cards 
                    int k = (int) (Math.random() * 4); // between 0 and 3 for suits 
                    int l = 1 + (int) (Math.random() * 9); // between 1 and 10 for ranks
                    System.out.println("\n>>>>>>>>>>Your random NUMBER card is: " + rank[l] + " of " + suit[k]);
                    break;
                default:
                    System.out.println("\nERROR! This is not a valid menu option. Please choose again or select 0 to EXIT.");
            }
        }
    }
}
