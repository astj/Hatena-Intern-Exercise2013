package Parser;
use strict;
use warnings;
use Log;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

sub parse {
    my $self = shift;

    my $ResultArray = [];
    open my $fh, '<', $self->{filename} or die $!;

    # 1行ずつ読み込みますか
    while(my $line = <$fh>) {
        chomp $line;
        my @SplittedLine = split("\t",$line);

        # 正規表現を変えた: /^(.+?):(.+)$/ -> /^(.+?):(.*)$/

#        # 半古典的手法
#        my $ParamsHash = {};
#        foreach(@SplittedLine) { if($_ =~ /^(.+?):(.*)$/ && $2 ne '-') { $ParamsHash->{$1} = $2; } }

        # Skipすべきデータ <=> "値が-である" 
        # Follow-Upを踏まえてmap使うコードに
        my $ParamsHash = { map { ($_ =~ /^(.+?):(.*)$/ && $2 ne '-') ? ($1=>$2) : ()} @SplittedLine };

        push @$ResultArray, Log->new(%$ParamsHash);
    }

    return $ResultArray;
}

1;
