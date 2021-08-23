using System;
using BFinanceModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace BFinanceDbContext
{
    public partial class BFinanceContext : DbContext
    {
        public BFinanceContext()
        {
        }

        public BFinanceContext(DbContextOptions<BFinanceContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<AutoTransfer> AutoTransfers { get; set; }
        public virtual DbSet<Bill> Bills { get; set; }
        public virtual DbSet<Subscription> Subscriptions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=BFinanceDb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.AccountBank)
                    .IsRequired()
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.AccountName)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.AccountNumber)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.AccountType)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<AutoTransfer>(entity =>
            {
                entity.HasKey(e => e.TransferId)
                    .HasName("PK__AutoTran__954900916FFF0D05");

                entity.Property(e => e.TransferAmount).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.TransferDate)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.TransferName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.TransferPeriod)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.FromAccount)
                    .WithMany(p => p.AutoTransferFromAccounts)
                    .HasForeignKey(d => d.FromAccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AutoTrans__FromA__787EE5A0");

                entity.HasOne(d => d.ToAccount)
                    .WithMany(p => p.AutoTransferToAccounts)
                    .HasForeignKey(d => d.ToAccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__AutoTrans__ToAcc__797309D9");
            });

            modelBuilder.Entity<Bill>(entity =>
            {
                entity.Property(e => e.BillName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentAmount).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.PaymentDueDate)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentPeriod)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.FromAccount)
                    .WithMany(p => p.Bills)
                    .HasForeignKey(d => d.FromAccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Bills__FromAccou__75A278F5");
            });

            modelBuilder.Entity<Subscription>(entity =>
            {
                entity.Property(e => e.PaymentAmount).HasColumnType("decimal(6, 2)");

                entity.Property(e => e.PaymentDueDate)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.PaymentPeriod)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.SubscriptionName)
                    .IsRequired()
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.HasOne(d => d.FromAccount)
                    .WithMany(p => p.Subscriptions)
                    .HasForeignKey(d => d.FromAccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Subscript__FromA__72C60C4A");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
